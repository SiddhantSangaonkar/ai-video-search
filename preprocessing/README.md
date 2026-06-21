# DevOps & Preprocessing Module (Weeks 1 - 5)

Welcome to the **AI Video Search Engine** Preprocessing & DevOps module. This directory houses the background worker pipeline and configuration files to extract video assets and host the containerized services.

---

## 📋 Objectives & Achievements (Weeks 1 - 5)

- [x] **FFmpeg Pipeline (Week 1)**: Built functions to extract mono WAV audio files at 16kHz (optimized for Whisper speech-to-text) and periodically extract keyframe images (downscaled to 640px width to save space).
- [x] **Celery Task Broker (Week 2)**: Wrapped FFmpeg functions into a **Celery** background worker using a **Redis** message broker.
- [x] **FastAPI Connection (Week 2)**: Connected background task dispatching and polling endpoints to the FastAPI application.
- [x] **Docker Compose Stack (Week 3)**: Designed a unified multi-container `docker-compose.yml` defining the FastAPI server, Celery worker, Redis queue, PostgreSQL database, Qdrant vector store, React frontend, and Flower monitor.
- [x] **Visual Monitoring (Week 4)**: Integrated **Flower** to visually track Celery task state transitions, speeds, and failures.
- [x] **Automate Test Suite (Week 4)**: Created an automated test suite ([test_preprocessing.py](file:///Users/meghana/ai_vsg/preprocessing/test_preprocessing.py)) using `pytest` to validate FFmpeg operations.
- [x] **Unified Control Script (Week 5)**: Created the master controller script ([run.sh](file:///Users/meghana/ai_vsg/run.sh)) to manage local configuration files, diagnose Docker status, execute test suites, and launch the compose stack in a single command.

---

## 🚀 DevOps Control Center (`run.sh`)

Use the wrapper script in the project root to control the development stack:

| Command | Action |
| :--- | :--- |
| `./run.sh` | Verify Docker and spin up the containerized application. |
| `./run.sh --build` | Force rebuild the Docker container images and run. |
| `./run.sh --test` | Execute the automated Python test suite. |
| `./run.sh --down` | Tear down and remove all active containers. |

---

## 🧪 Running Automated Tests

To verify the extraction pipeline functions (audio formats, duration checking, frame intervals, error validation):
```bash
./run.sh --test
```

---

## 🔍 Visual Verification Dashboards

When the application is running via `./run.sh`, open these links in your browser:
*   **FastAPI Swagger UI:** `http://localhost:8000/docs` (Test uploads and job status tracking).
*   **Flower Celery Dashboard:** `http://localhost:5555` (View background worker queues and statuses).
