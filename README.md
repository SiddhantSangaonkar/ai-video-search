# AI Video Search Engine Backend

Sarna backend scope completed through Week 5 from the project specification.

## Services

`docker compose up --build` starts:

- FastAPI backend on `http://localhost:8000`
- PostgreSQL on port `5432`
- Redis on port `6379`
- Celery worker for upload processing jobs
- Qdrant on `http://localhost:6333`

## Implemented Backend Scope

### Week 1

- FastAPI server with Uvicorn
- Swagger docs at `http://localhost:8000/docs`
- Base APIs: `GET /`, `POST /upload`, `POST /search`
- PostgreSQL SQLAlchemy setup
- Tables: `videos`, `transcript_segments`

### Week 2

- Real video upload endpoint
- Saves videos into `uploads/`
- Stores filename, file size, content type, upload time, and status in PostgreSQL
- Returns `video_id` and Celery `job_id`

### Week 3

- `POST /search` receives `video_id`, `query`, and `limit`
- Returns timestamps, transcript snippets, and confidence scores
- Ranking uses stored segment score plus keyword overlap until Qdrant semantic search is plugged in

### Week 4

- `GET /status/{video_id}` endpoint
- Better error handling for missing videos, invalid uploads, invalid timestamps, failed jobs, and not-ready searches
- Clear response schemas for Swagger/Postman testing

### Week 5

- Docker Compose starts the full backend stack in one command
- Redis + Celery worker added for background processing
- Qdrant service added for AI/ML integration
- FFmpeg installed inside the backend image for preprocessing integration
- Uploads enqueue a background processing job
- Worker updates video status from `uploaded` to `processing` to `ready`
- Worker inserts placeholder transcript rows so search can be tested end to end before Whisper is integrated

## Run

Make sure Docker Desktop is open and running.

```powershell
cd "C:\Users\sarna\OneDrive\Desktop\search engine\ai-video-search-engine"
docker compose up --build
```

Open:

```text
http://localhost:8000/docs
```

## Swagger Test Flow

1. Run `GET /health/db` to confirm PostgreSQL is connected.
2. Run `POST /upload` with a video file.
3. Copy the returned `video_id` and `job_id`.
4. Run `GET /jobs/{job_id}` until the state is `SUCCESS`.
5. Run `GET /status/{video_id}` and confirm status is `ready`.
6. Run `GET /videos/{video_id}/segments` to see transcript rows.
7. Run `POST /search` using the same `video_id`.

Example search body:

```json
{
  "video_id": "paste-video-id-here",
  "query": "semantic search",
  "limit": 5
}
```

## API List

- `GET /`
- `GET /health/db`
- `POST /upload`
- `GET /videos`
- `GET /videos/{video_id}`
- `GET /status/{video_id}`
- `GET /jobs/{job_id}`
- `POST /videos/{video_id}/segments`
- `GET /videos/{video_id}/segments`
- `POST /search`

## Integration Notes For Teammates

- DevOps can replace the worker placeholder with real FFmpeg extraction.
- AI/ML can write Whisper transcript chunks into `transcript_segments` and Qdrant vectors.
- Frontend can call `/upload`, poll `/status/{video_id}`, then call `/search` and seek to result timestamps.
