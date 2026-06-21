# AI Video Search Engine - Backend

Backend services for the AI Video Search Engine project.

The backend handles video uploads, metadata storage, background processing, transcript management, and search APIs. It is designed so that Whisper, Sentence Transformers, CLIP, and Qdrant-based semantic search can be integrated without changing the public API.

## Tech Stack

* FastAPI
* PostgreSQL
* SQLAlchemy
* Redis
* Celery
* Qdrant
* Docker Compose
* FFmpeg

## Features

* Video upload and storage
* PostgreSQL metadata management
* Background processing with Celery
* Job and processing status tracking
* Transcript segment management
* Search API for timestamp retrieval
* Swagger/OpenAPI documentation
* Dockerized local development environment

## Running the Project

Prerequisites:

* Docker Desktop
* Docker Compose

Start all services:

```bash
docker compose up --build
```

Available services:

| Service      | URL                        |
| ------------ | -------------------------- |
| FastAPI      | http://localhost:8000      |
| Swagger Docs | http://localhost:8000/docs |
| Qdrant       | http://localhost:6333      |
| PostgreSQL   | localhost:5432             |
| Redis        | localhost:6379             |

## Processing Flow

```text
Upload Video
     ↓
Store Metadata
     ↓
Create Background Job
     ↓
Celery Worker
     ↓
Generate Transcript Segments
     ↓
Store Results
     ↓
Search by Timestamp
```

## Current Status

Implemented:

* Upload pipeline
* PostgreSQL integration
* Redis and Celery processing
* Status tracking
* Transcript segment APIs
* Search endpoint
* Docker Compose deployment

Planned integrations:

* Whisper transcription
* Sentence Transformer embeddings
* Qdrant semantic search
* CLIP visual search

## API Endpoints

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| GET    | /                           | Service information        |
| GET    | /health/db                  | Database health check      |
| POST   | /upload                     | Upload a video             |
| GET    | /videos                     | List uploaded videos       |
| GET    | /videos/{video_id}          | Get video metadata         |
| GET    | /status/{video_id}          | Processing status          |
| GET    | /jobs/{job_id}              | Celery job status          |
| POST   | /videos/{video_id}/segments | Create transcript segments |
| GET    | /videos/{video_id}/segments | List transcript segments   |
| POST   | /search                     | Search transcript content  |

## Notes for Integration

### Frontend

* Upload videos through `/upload`
* Poll `/status/{video_id}`
* Use `/search` for timestamp retrieval
* Seek the video player to returned timestamps

### AI/ML

* Replace placeholder transcript generation with Whisper output
* Generate embeddings using Sentence Transformers
* Store vectors in Qdrant
* Extend search to semantic retrieval

### DevOps

* Extend worker pipeline with FFmpeg preprocessing
* Manage deployment, monitoring, and reliability improvements
