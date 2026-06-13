import os
import subprocess
import shutil
import logging
from typing import List, Dict, Any

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def get_video_duration(video_path: str) -> float:
    """
    Get the duration of a video file in seconds using ffprobe.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")

    cmd = [
        "ffprobe",
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        video_path
    ]

    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        duration_str = result.stdout.strip()
        if not duration_str:
            # Fallback to checking stream duration if format duration is not available
            cmd_fallback = [
                "ffprobe",
                "-v", "error",
                "-select_streams", "v:0",
                "-show_entries", "stream=duration",
                "-of", "default=noprint_wrappers=1:nokey=1",
                video_path
            ]
            result_fallback = subprocess.run(cmd_fallback, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
            duration_str = result_fallback.stdout.strip()
            
        if not duration_str or duration_str == "N/A":
            raise ValueError("Unable to determine video duration from metadata.")
            
        return float(duration_str)
    except (subprocess.CalledProcessError, ValueError) as e:
        logger.error(f"Error getting video duration for {video_path}: {e}")
        raise RuntimeError(f"Failed to retrieve video duration: {e}")

def has_audio_stream(video_path: str) -> bool:
    """
    Check if the video file contains at least one audio stream.
    """
    cmd = [
        "ffprobe",
        "-v", "error",
        "-select_streams", "a",
        "-show_entries", "stream=codec_type",
        "-of", "default=noprint_wrappers=1:nokey=1",
        video_path
    ]
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        return "audio" in result.stdout.strip()
    except subprocess.CalledProcessError:
        return False

def extract_audio(video_path: str, output_audio_path: str, sample_rate: int = 16000) -> str | None:
    """
    Extract audio from a video file and save it as a mono WAV file at the specified sample rate.
    This format (16kHz, mono, PCM 16-bit WAV) is optimized for Whisper speech-to-text.
    Returns the path to the audio file if successful, or None if no audio stream exists.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")

    if not has_audio_stream(video_path):
        logger.warning(f"Video file {video_path} does not contain any audio stream. Skipping extraction.")
        return None

    # Ensure output directory exists
    output_dir = os.path.dirname(output_audio_path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)

    # ffmpeg command:
    # -y: Overwrite output file if it exists
    # -i: Input video path
    # -vn: Disable video recording (audio only)
    # -acodec pcm_s16le: Output 16-bit PCM WAV
    # -ar: Audio sample rate (e.g. 16000 Hz)
    # -ac: Audio channels (1 = mono)
    cmd = [
        "ffmpeg",
        "-y",
        "-threads", "0",
        "-i", video_path,
        "-vn",
        "-acodec", "pcm_s16le",
        "-ar", str(sample_rate),
        "-ac", "1",
        output_audio_path
    ]

    logger.info(f"Extracting audio from {video_path} to {output_audio_path}...")
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        logger.info("Audio extraction completed successfully.")
        return output_audio_path
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg audio extraction failed: {e.stderr}")
        raise RuntimeError(f"FFmpeg error: {e.stderr}")

def extract_frames(video_path: str, output_dir: str, interval_seconds: float = 2.0) -> List[str]:
    """
    Extract frames from a video file at regular intervals (e.g., every N seconds).
    Saves frames as JPEG files in the output directory.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")

    os.makedirs(output_dir, exist_ok=True)

    # ffmpeg command:
    # -y: Overwrite files
    # -i: Input video path
    # -vf: Video filter for frame rate (fps=1/interval_seconds)
    # -q:v 2: Quality factor for JPEGs (2 is very high quality, scale is 1-31)
    # output pattern: frame_%04d.jpg
    
    # We use fps and scale filter: extracts 1 frame every N seconds and downscales to max width 640px to save storage/processing
    video_filter = f"fps=1/{interval_seconds},scale='min(640,iw)':-1"
    
    output_pattern = os.path.join(output_dir, "frame_%04d.jpg")
    
    cmd = [
        "ffmpeg",
        "-y",
        "-threads", "0",
        "-i", video_path,
        "-vf", video_filter,
        "-q:v", "2",
        output_pattern
    ]

    logger.info(f"Extracting frames from {video_path} to {output_dir} every {interval_seconds}s...")
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        
        # List all generated frames
        extracted_files = sorted([
            os.path.join(output_dir, f) for f in os.listdir(output_dir)
            if f.startswith("frame_") and f.endswith(".jpg")
        ])
        logger.info(f"Frame extraction completed. Extracted {len(extracted_files)} frames.")
        return extracted_files
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg frame extraction failed: {e.stderr}")
        raise RuntimeError(f"FFmpeg error: {e.stderr}")

def generate_dummy_video(output_video_path: str, duration_seconds: int = 5) -> str:
    """
    Generates a dummy test video with a visual clock pattern and an audio tone.
    """
    output_dir = os.path.dirname(output_video_path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)

    # ffmpeg command:
    # -f lavfi -i testsrc: Visual test pattern
    # -f lavfi -i sine=frequency=440:beep_factor=4: Audio sine wave tone
    # -t: Duration in seconds
    # -pix_fmt yuv420p: Standard pixel format for compatibility
    cmd = [
        "ffmpeg",
        "-y",
        "-f", "lavfi",
        "-i", f"testsrc=duration={duration_seconds}:size=640x480:rate=25",
        "-f", "lavfi",
        "-i", f"sine=frequency=440:duration={duration_seconds}",
        "-pix_fmt", "yuv420p",
        output_video_path
    ]

    logger.info(f"Generating dummy test video ({duration_seconds}s) at {output_video_path}...")
    try:
        subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        logger.info("Dummy video generated successfully.")
        return output_video_path
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to generate dummy video: {e.stderr}")
        raise RuntimeError(f"FFmpeg error: {e.stderr}")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="FFmpeg Video Preprocessing Utility")
    parser.add_argument("video_path", nargs="?", help="Path to actual video file (optional)")
    parser.add_argument("--interval", type=float, default=2.0, help="Interval in seconds for frame extraction (default: 2.0)")
    
    args = parser.parse_args()
    
    if args.video_path:
        # Process actual video file
        video_path = args.video_path
        print(f"\n--- Processing Video: {video_path} ---")
        
        try:
            # 1. Get duration
            duration = get_video_duration(video_path)
            print(f"Video Duration: {duration:.2f} seconds")
            
            # Create output names based on the video name
            base_name = os.path.splitext(os.path.basename(video_path))[0]
            # Save all outputs under the centralized "outputs" folder in the workspace root
            workspace_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            output_dir = os.path.join(workspace_root, "outputs", base_name)
            os.makedirs(output_dir, exist_ok=True)
            
            extracted_audio = os.path.join(output_dir, f"{base_name}_audio.wav")
            extracted_frames_dir = os.path.join(output_dir, "frames")
            
            # 2. Extract audio
            audio_path = extract_audio(video_path, extracted_audio)
            if audio_path:
                print(f"Audio extracted to: {audio_path}")
                print(f"Audio file size: {os.path.getsize(audio_path)} bytes")
            else:
                print("No audio stream found. Skipping audio extraction.")
            
            # 3. Extract frames
            frames = extract_frames(video_path, extracted_frames_dir, interval_seconds=args.interval)
            print(f"Extracted {len(frames)} frames into: {extracted_frames_dir}")
            
            print(f"\n--- Processing SUCCESS. Results saved in: {output_dir} ---")
        except Exception as e:
            logger.exception("An error occurred during processing:")
            print(f"\n--- Processing FAILED: {e} ---")
    else:
        # Default self-test check
        print("--- Testing Preprocessing Module ---")
        
        test_dir = os.path.join(os.path.dirname(__file__), "test_output")
        os.makedirs(test_dir, exist_ok=True)
        
        dummy_video = os.path.join(test_dir, "test_video.mp4")
        extracted_audio = os.path.join(test_dir, "test_audio.wav")
        extracted_frames_dir = os.path.join(test_dir, "frames")
        
        try:
            # 1. Generate test video
            generate_dummy_video(dummy_video, duration_seconds=6)
            
            # 2. Get duration
            duration = get_video_duration(dummy_video)
            print(f"Verified Video Duration: {duration} seconds")
            
            # 3. Extract audio
            audio_path = extract_audio(dummy_video, extracted_audio)
            if audio_path:
                print(f"Audio extracted to: {audio_path}")
                print(f"Audio file size: {os.path.getsize(audio_path)} bytes")
            else:
                print("No audio stream found. Skipping audio extraction.")
            
            # 4. Extract frames
            frames = extract_frames(dummy_video, extracted_frames_dir, interval_seconds=2.0)
            print(f"Extracted {len(frames)} frames into: {extracted_frames_dir}")
            for i, frame in enumerate(frames):
                print(f"  Frame {i+1}: {os.path.basename(frame)}")
                
            print("\n--- Preprocessing Module Test SUCCESS ---")
            
        except Exception as e:
            logger.exception("An error occurred during testing:")
            print(f"\n--- Preprocessing Module Test FAILED: {e} ---")

