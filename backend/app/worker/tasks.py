from uuid import UUID

from celery.utils.log import get_task_logger

from app.db.session import SessionLocal
from app.models import TranscriptSegment, Video, VideoStatus
from app.worker.celery_app import celery_app

logger = get_task_logger(__name__)


@celery_app.task(bind=True, name="process_uploaded_video")
def process_uploaded_video(self, video_id: str) -> dict[str, str]:
    """Backend processing hook for upload jobs.

    The AI lead can replace the placeholder segment creation with FFmpeg,
    Whisper, chunking, embeddings, and Qdrant writes without changing the API.
    """
    db = SessionLocal()
    try:
        video = db.get(Video, UUID(video_id))
        if video is None:
            logger.warning("Video %s was not found", video_id)
            return {"status": "missing", "video_id": video_id}

        video.status = VideoStatus.processing
        video.error_message = None
        db.commit()

        existing_segments = (
            db.query(TranscriptSegment)
            .filter(TranscriptSegment.video_id == video.id)
            .count()
        )
        if existing_segments == 0:
            db.add_all(
                [
                    TranscriptSegment(
                        video_id=video.id,
                        start_time=0.0,
                        end_time=30.0,
                        text=f"Uploaded video {video.original_filename} is queued for AI transcription and semantic search.",
                        score=0.6,
                    ),
                    TranscriptSegment(
                        video_id=video.id,
                        start_time=30.0,
                        end_time=60.0,
                        text="This placeholder segment proves the backend search, ranking, timestamp, and database flow works before Whisper is connected.",
                        score=0.7,
                    ),
                ]
            )

        video.status = VideoStatus.ready
        db.commit()
        return {"status": "ready", "video_id": video_id}
    except Exception as exc:
        db.rollback()
        video = db.get(Video, UUID(video_id))
        if video is not None:
            video.status = VideoStatus.failed
            video.error_message = str(exc)
            db.commit()
        logger.exception("Processing failed for video %s", video_id)
        raise
    finally:
        db.close()
