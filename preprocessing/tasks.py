import os
import logging
from preprocessing.celery_app import app
from preprocessing.extract import get_video_duration, extract_audio, extract_frames

logger = logging.getLogger(__name__)

@app.task(bind=True, name="preprocessing.tasks.process_video")
def process_video_task(self, video_path: str, output_dir: str, interval_seconds: float = 2.0):
    """
    Celery task to run the FFmpeg preprocessing pipeline on an uploaded video.
    Returns metadata about the extracted audio and frames.
    """
    logger.info(f"Starting video processing task for: {video_path}")
    
    self.update_state(
        state="PROGRESS",
        meta={
            "stage": "starting",
            "progress": 10,
            "message": "Initializing task..."
        }
    )
    
    try:
        # Check video existence
        if not os.path.exists(video_path):
            raise FileNotFoundError(f"Video file not found at: {video_path}")
            
        # 1. Retrieve video duration
        duration = get_video_duration(video_path)
        logger.info(f"Video duration: {duration:.2f} seconds")
        
        # Setup paths inside the specified output directory
        base_name = os.path.splitext(os.path.basename(video_path))[0]
        output_audio_path = os.path.join(output_dir, f"{base_name}_audio.wav")
        frames_output_dir = os.path.join(output_dir, "frames")
        
        # 2. Extract Audio
        self.update_state(
            state="PROGRESS",
            meta={
                "stage": "extracting_audio",
                "progress": 30,
                "message": "Extracting audio stream (16kHz mono WAV format for Whisper)...",
                "duration": duration
            }
        )
        audio_path = extract_audio(video_path, output_audio_path)
        
        # 3. Extract Frames
        self.update_state(
            state="PROGRESS",
            meta={
                "stage": "extracting_keyframes",
                "progress": 65,
                "message": f"Extracting video frames every {interval_seconds}s for visual embeddings...",
                "duration": duration,
                "audio_path": audio_path
            }
        )
        frames = extract_frames(video_path, frames_output_dir, interval_seconds=interval_seconds)
        
        # Success output
        logger.info(f"Preprocessing completed for video: {video_path}")
        return {
            "status": "COMPLETED",
            "filename": os.path.basename(video_path),
            "video_path": video_path,
            "duration": duration,
            "audio_path": audio_path,
            "frames_dir": frames_output_dir,
            "frames_count": len(frames),
            "frames": [os.path.basename(f) for f in frames]
        }
        
    except Exception as e:
        logger.error(f"Error during video preprocessing: {str(e)}", exc_info=True)
        # We re-raise to mark task as FAILED in Celery, but update the state meta first
        self.update_state(
            state="FAILURE",
            meta={
                "stage": "failed",
                "progress": 100,
                "message": f"Processing failed: {str(e)}"
            }
        )
        raise e
