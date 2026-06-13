# DevOps & Preprocessing - Week 1

Welcome to the **AI Video Search Engine** preprocessing module. This directory contains the core pipeline for extracting audio and video frames from uploaded media using **FFmpeg**.

---

## 📋 Week 1 Objectives & Achievements

- [x] **Install FFmpeg and test audio extraction**: Set up command-line calls to convert video audio to a 16kHz mono WAV format optimized for Whisper.
- [x] **Learn frame extraction**: Configure periodic frame extraction at custom intervals (e.g., every 2 seconds) for visual embeddings.
- [x] **Automate verification**: Created a python script (`extract.py`) that generates a dummy video locally and tests duration querying, audio extraction, and frame extraction end-to-end.
- [x] **Docker setup**: Verified Docker and Docker Compose environment configuration.

---

## 🛠 How It Works (FFmpeg CLI Commands)

### 1. Retrieve Video Duration
To fetch the precise duration of a video file without decoding it:
```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 input_video.mp4
```
* **`-v error`**: Suppress diagnostic logs and banner info.
* **`-show_entries format=duration`**: Select only the duration entry from the metadata.
* **`-of default=noprint_wrappers=1:nokey=1`**: Output format settings to output only the value, with no headers or keys.

### 2. Extract Audio (Optimized for Whisper)
Whisper works best with mono PCM 16-bit WAV files sampled at 16kHz:
```bash
ffmpeg -y -i input_video.mp4 -vn -acodec pcm_s16le -ar 16000 -ac 1 output_audio.wav
```
* **`-y`**: Overwrite the output file if it exists.
* **`-vn`**: Disable video stream mapping (audio only).
* **`-acodec pcm_s16le`**: Encode audio to raw 16-bit signed little-endian PCM.
* **`-ar 16000`**: Force sample rate to 16000 Hz.
* **`-ac 1`**: Downmix stereo or multi-channel audio to mono (1 channel).

### 3. Periodic Frame Extraction (For Visual Embeddings)
Extracting frames at regular intervals (e.g., 1 frame every 2 seconds) for visual indexing:
```bash
ffmpeg -y -i input_video.mp4 -vf "fps=1/2" -q:v 2 output_directory/frame_%04d.jpg
```
* **`-vf "fps=1/2"`**: Video filter to output `1/2` frames per second (1 frame every 2 seconds). To change the interval, use `fps=1/INTERVAL`.
* **`-q:v 2`**: High quality scale (range 1-31, where 2 is near-lossless JPEG quality).
* **`frame_%04d.jpg`**: Output naming scheme (e.g., `frame_0001.jpg`, `frame_0002.jpg`, etc.).

---

## 🚀 Running the Week 1 Test Script

You can verify the entire pipeline on your machine right now by running the automated script. It generates a synthetic video and runs the extraction processes.

```bash
python3 preprocessing/extract.py
```

### Output Directory Structure
Running the script generates a `test_output/` folder inside `preprocessing/`:
```
preprocessing/test_output/
├── test_video.mp4       # The generated 6-second test video
├── test_audio.wav       # The extracted 16kHz mono WAV file
└── frames/              # Extracted JPEGs
    ├── frame_0001.jpg   # Frame at t = 0s
    ├── frame_0002.jpg   # Frame at t = 2s
    └── frame_0003.jpg   # Frame at t = 4s
```

---
