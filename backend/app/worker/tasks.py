from uuid import UUID
from pathlib import Path

from celery.utils.log import get_task_logger

from app.db.session import SessionLocal
from app.models import TranscriptSegment, Video, VideoStatus
from app.worker.celery_app import celery_app
from app.core.config import get_settings

# Import preprocessing pipeline functions
from preprocessing.extract import extract_audio, extract_frames, get_video_duration

logger = get_task_logger(__name__)


@celery_app.task(bind=True, name="process_uploaded_video")
def process_uploaded_video(self, video_id: str) -> dict[str, str]:
    """Backend processing hook for upload jobs.

    Calls the FFmpeg preprocessing pipeline (audio & frame extraction)
    and populates initial database transcript segments.
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

        # Get settings for upload directory and setup outputs directory
        settings = get_settings()
        video_path = Path(settings.upload_dir) / video.stored_filename
        output_dir = Path("outputs") / video_id
        output_dir.mkdir(parents=True, exist_ok=True)

        output_audio_path = output_dir / f"{video_id}_audio.wav"
        frames_dir = output_dir / "frames"

        logger.info(f"Running preprocessing for video: {video_path}")
        
        # Run FFmpeg duration check, audio extraction, and frame extraction
        duration = get_video_duration(str(video_path))
        audio_path = extract_audio(str(video_path), str(output_audio_path))
        frames = extract_frames(str(video_path), str(frames_dir), interval_seconds=2.0)
        
        logger.info(
            f"Preprocessing successful: duration={duration:.2f}s, "
            f"audio={audio_path}, frames_count={len(frames)}"
        )

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
                        end_time=min(30.0, duration),
                        text=f"Uploaded video {video.original_filename} is queued for AI transcription and semantic search. Duration: {duration:.2f}s.",
                        score=0.6,
                    ),
                    TranscriptSegment(
                        video_id=video.id,
                        start_time=min(30.0, duration),
                        end_time=duration,
                        text="This placeholder segment proves the backend search, ranking, timestamp, and database flow works before Whisper is connected.",
                        score=0.7,
                    ),
                ]
            )

        video.status = VideoStatus.ready
        db.commit()
        return {
            "status": "ready",
            "video_id": video_id,
            "duration": duration,
            "frames_count": len(frames)
        }
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

