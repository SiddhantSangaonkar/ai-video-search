import os
import shutil
import pytest
from uuid import uuid4
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import get_settings
from app.db.base import Base
from app.models.video import Video, VideoStatus, TranscriptSegment
from app.worker.tasks import process_uploaded_video
from preprocessing.extract import generate_dummy_video

@pytest.fixture(scope="module")
def setup_test_db_and_media():
    # Setup test workspace directories
    test_dir = Path("outputs/test_integration")
    test_dir.mkdir(parents=True, exist_ok=True)
    
    # Save original settings database url and upload dir
    settings = get_settings()
    orig_db_url = settings.database_url
    orig_upload_dir = settings.upload_dir
    
    # Override settings for testing
    db_path = test_dir / "test.db"
    settings.database_url = f"sqlite:///{db_path}"
    upload_dir = test_dir / "uploads"
    upload_dir.mkdir(parents=True, exist_ok=True)
    settings.upload_dir = upload_dir
    
    # Re-initialize the SQLAlchemy engine for SQLite
    test_engine = create_engine(settings.database_url, connect_args={"check_same_thread": False})
    Base.metadata.create_all(bind=test_engine)
    
    TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
    
    # Mock SessionLocal in tasks
    import app.worker.tasks
    orig_session_local = app.worker.tasks.SessionLocal
    app.worker.tasks.SessionLocal = TestSessionLocal
    
    # Create a dummy video
    dummy_video_filename = "test_video.mp4"
    dummy_video_path = upload_dir / dummy_video_filename
    generate_dummy_video(str(dummy_video_path), duration_seconds=3)
    
    yield {
        "db": TestSessionLocal,
        "video_path": dummy_video_path,
        "filename": dummy_video_filename,
        "upload_dir": upload_dir,
        "test_dir": test_dir
    }
    
    # Restore original settings and SessionLocal
    settings.database_url = orig_db_url
    settings.upload_dir = orig_upload_dir
    app.worker.tasks.SessionLocal = orig_session_local
    
    # Clean up test directories
    if test_dir.exists():
        shutil.rmtree(test_dir)

def test_process_uploaded_video_integration(setup_test_db_and_media):
    db_session_factory = setup_test_db_and_media["db"]
    filename = setup_test_db_and_media["filename"]
    video_path = setup_test_db_and_media["video_path"]
    
    # Create database entries
    db = db_session_factory()
    try:
        video_id = uuid4()
        video = Video(
            id=video_id,
            original_filename="sample.mp4",
            stored_filename=filename,
            content_type="video/mp4",
            file_size=video_path.stat().st_size,
            status=VideoStatus.uploaded
        )
        db.add(video)
        db.commit()
    finally:
        db.close()
        
    # Run the Celery task synchronously
    result = process_uploaded_video(str(video_id))
    
    assert result["status"] == "ready"
    assert result["video_id"] == str(video_id)
    assert result["duration"] == 3.0
    assert result["frames_count"] >= 2 # 1 every 2s for 3s video
    
    # Verify outputs exist on disk
    output_dir = Path("outputs") / str(video_id)
    assert output_dir.exists()
    assert (output_dir / f"{video_id}_audio.wav").exists()
    assert (output_dir / "frames").exists()
    
    # Verify DB has been updated correctly
    db = db_session_factory()
    try:
        updated_video = db.get(Video, video_id)
        assert updated_video.status == VideoStatus.ready
        assert updated_video.error_message is None
        
        segments = db.query(TranscriptSegment).filter(TranscriptSegment.video_id == video_id).all()
        assert len(segments) == 2
        assert segments[0].start_time == 0.0
        assert segments[0].end_time == 3.0
        assert "sample.mp4" in segments[0].text
    finally:
        db.close()
        # Clean up outputs for this specific video
        if output_dir.exists():
            shutil.rmtree(output_dir)
