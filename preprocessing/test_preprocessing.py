import os
import shutil
# pyrefly: ignore [missing-import]
import pytest
from preprocessing.extract import (
    get_video_duration,
    has_audio_stream,
    extract_audio,
    extract_frames,
    generate_dummy_video
)

@pytest.fixture(scope="module")
def test_env():
    # Setup temporary directory for test media
    test_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "preprocessing", "pytest_output")
    os.makedirs(test_dir, exist_ok=True)
    
    # Generate a standard dummy video (3 seconds long)
    video_path = os.path.join(test_dir, "pytest_video.mp4")
    generate_dummy_video(video_path, duration_seconds=3)
    
    yield {
        "dir": test_dir,
        "video": video_path
    }
    
    # Cleanup after all tests in the module run
    if os.path.exists(test_dir):
        shutil.rmtree(test_dir)

def test_video_duration(test_env):
    video_path = test_env["video"]
    duration = get_video_duration(video_path)
    assert duration == 3.0

def test_has_audio_stream(test_env):
    video_path = test_env["video"]
    assert has_audio_stream(video_path) is True

def test_extract_audio(test_env):
    video_path = test_env["video"]
    output_audio = os.path.join(test_env["dir"], "pytest_audio.wav")
    
    audio_path = extract_audio(video_path, output_audio)
    assert audio_path == output_audio
    assert os.path.exists(audio_path)
    assert os.path.getsize(audio_path) > 0

def test_extract_frames(test_env):
    video_path = test_env["video"]
    output_frames_dir = os.path.join(test_env["dir"], "pytest_frames")
    
    # Extract frames every 1.0 seconds
    frames = extract_frames(video_path, output_frames_dir, interval_seconds=1.0)
    
    # Since video is 3 seconds, interval is 1.0, it should extract at least 3 frames (t=0s, t=1s, t=2s)
    assert len(frames) >= 3
    for frame in frames:
        assert os.path.exists(frame)
        assert frame.endswith(".jpg")

def test_missing_video_errors(test_env):
    non_existent = os.path.join(test_env["dir"], "non_existent.mp4")
    
    with pytest.raises(FileNotFoundError):
        get_video_duration(non_existent)
        
    with pytest.raises(FileNotFoundError):
        extract_audio(non_existent, "any_out.wav")
        
    with pytest.raises(FileNotFoundError):
        extract_frames(non_existent, "any_out_dir")
