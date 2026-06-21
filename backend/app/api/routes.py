from pathlib import Path
from uuid import UUID

from celery.result import AsyncResult
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.core.config import Settings, get_settings
from app.db.session import get_db
from app.models import TranscriptSegment, Video, VideoStatus
from app.schemas import (
    JobStatusResponse,
    SearchRequest,
    SearchResponse,
    StatusResponse,
    TranscriptSegmentCreate,
    TranscriptSegmentResponse,
    UploadResponse,
    VideoResponse,
)
from app.services.search import rank_transcript_segments
from app.services.storage import save_upload_file
from app.worker.celery_app import celery_app
from app.worker.tasks import process_uploaded_video

router = APIRouter()


@router.get("/", tags=["health"])
def health_check() -> dict[str, str]:
    return {"message": "AI Video Search Engine API is running", "docs": "/docs"}


@router.get("/health/db", tags=["health"])
def database_health(db: Session = Depends(get_db)) -> dict[str, str]:
    db.execute(select(1))
    return {"database": "connected"}


@router.post(
    "/upload",
    response_model=UploadResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["videos"],
)
async def upload_video(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> UploadResponse:
    stored_filename, file_size = await save_upload_file(file, settings)

    video = Video(
        original_filename=file.filename or stored_filename,
        stored_filename=stored_filename,
        content_type=file.content_type,
        file_size=file_size,
        status=VideoStatus.uploaded,
    )

    try:
        db.add(video)
        db.commit()
        db.refresh(video)
    except SQLAlchemyError as exc:
        db.rollback()
        upload_path = Path(settings.upload_dir) / stored_filename
        upload_path.unlink(missing_ok=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Upload saved, but database metadata could not be stored.",
        ) from exc

    try:
        task = process_uploaded_video.delay(str(video.id))
    except Exception as exc:
        video.status = VideoStatus.failed
        video.error_message = "Background worker queue is unavailable."
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Upload was stored, but the background worker queue is unavailable.",
        ) from exc

    return UploadResponse(
        video_id=video.id,
        job_id=task.id,
        status=video.status,
        message="Video uploaded successfully. Processing job queued.",
    )


@router.get("/videos", response_model=list[VideoResponse], tags=["videos"])
def list_videos(db: Session = Depends(get_db)) -> list[Video]:
    return list(db.scalars(select(Video).order_by(Video.created_at.desc())).all())


@router.get("/videos/{video_id}", response_model=VideoResponse, tags=["videos"])
def get_video(video_id: UUID, db: Session = Depends(get_db)) -> Video:
    video = db.get(Video, video_id)
    if video is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found.")
    return video


@router.get("/status/{video_id}", response_model=StatusResponse, tags=["videos"])
def get_status(video_id: UUID, db: Session = Depends(get_db)) -> StatusResponse:
    video = db.get(Video, video_id)
    if video is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found.")

    messages = {
        VideoStatus.uploaded: "Video uploaded and waiting for processing.",
        VideoStatus.processing: "Video is currently being processed.",
        VideoStatus.ready: "Video is ready for search.",
        VideoStatus.failed: "Video processing failed.",
    }
    return StatusResponse(
        video_id=video.id,
        status=video.status,
        error_message=video.error_message,
        message=messages[video.status],
    )


@router.get("/jobs/{job_id}", response_model=JobStatusResponse, tags=["videos"])
def get_job_status(job_id: str) -> JobStatusResponse:
    result = AsyncResult(job_id, app=celery_app)
    payload = result.result if result.ready() else None
    if isinstance(payload, Exception):
        payload = str(payload)
    return JobStatusResponse(job_id=job_id, state=result.state, result=payload)


@router.post(
    "/videos/{video_id}/segments",
    response_model=TranscriptSegmentResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["transcripts"],
)
def create_transcript_segment(
    video_id: UUID,
    payload: TranscriptSegmentCreate,
    db: Session = Depends(get_db),
) -> TranscriptSegment:
    video = db.get(Video, video_id)
    if video is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found.")
    if payload.end_time <= payload.start_time:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="end_time must be after start_time.")

    segment = TranscriptSegment(
        video_id=video_id,
        start_time=payload.start_time,
        end_time=payload.end_time,
        text=payload.text,
        score=payload.score,
    )
    db.add(segment)
    video.status = VideoStatus.ready
    db.commit()
    db.refresh(segment)
    return segment


@router.get(
    "/videos/{video_id}/segments",
    response_model=list[TranscriptSegmentResponse],
    tags=["transcripts"],
)
def list_transcript_segments(video_id: UUID, db: Session = Depends(get_db)) -> list[TranscriptSegment]:
    video = db.get(Video, video_id)
    if video is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found.")
    stmt = select(TranscriptSegment).where(TranscriptSegment.video_id == video_id).order_by(TranscriptSegment.start_time)
    return list(db.scalars(stmt).all())


@router.post("/search", response_model=SearchResponse, tags=["search"])
def search_video(payload: SearchRequest, db: Session = Depends(get_db)) -> SearchResponse:
    video = db.get(Video, payload.video_id)
    if video is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found.")
    if video.status == VideoStatus.failed:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Video processing failed; search is unavailable.")
    if video.status != VideoStatus.ready:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Video is not ready for search yet.")

    results = rank_transcript_segments(db, payload.video_id, payload.query, payload.limit)
    return SearchResponse(
        video_id=payload.video_id,
        query=payload.query,
        result_count=len(results),
        results=results,
    )

