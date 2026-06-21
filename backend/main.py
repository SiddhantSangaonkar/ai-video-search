import os
import shutil
import uuid
# pyrefly: ignore [missing-import]
from fastapi import FastAPI, File, UploadFile, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from celery.result import AsyncResult
from preprocessing.celery_app import app as celery_app
from preprocessing.tasks import process_video_task

app = FastAPI(
    title="AI Video Search Engine API",
    description="Backend API for uploading, processing, and searching video content.",
    version="1.0.0"
)

# Enable CORS to allow the React frontend to communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Centralize paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "backend", "uploads")
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")

# Ensure critical directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "service": "AI Video Search Engine API",
        "documentation": "/docs"
    }

@app.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    """
    Accepts video files, saves them locally, and schedules Celery task for processing.
    Returns the job ID to poll for status.
    """
    # Accept standard video container extensions
    allowed_extensions = {".mp4", ".avi", ".mkv", ".mov", ".webm"}
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format. Allowed formats: {', '.join(allowed_extensions)}"
        )

    # Generate a unique Job ID (UUID)
    job_id = str(uuid.uuid4())
    
    # Save the raw uploaded video inside an isolated directory
    job_upload_dir = os.path.join(UPLOAD_DIR, job_id)
    os.makedirs(job_upload_dir, exist_ok=True)
    saved_video_path = os.path.join(job_upload_dir, file.filename)
    
    try:
        with open(saved_video_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to store video locally: {str(e)}"
        )
        
    # Output directory for the processed files (WAV, frames folder)
    job_output_dir = os.path.join(OUTPUT_DIR, job_id)
    
    # Dispatch Celery background task using the job_id as task_id
    task = process_video_task.apply_async(
        args=[saved_video_path, job_output_dir],
        task_id=job_id
    )
    
    return {
        "job_id": job_id,
        "task_id": task.id,
        "filename": file.filename,
        "status": "PENDING"
    }

@app.get("/status/{job_id}")
def get_status(job_id: str):
    """
    Retrieve progress and outputs of a background video processing task.
    """
    res = AsyncResult(job_id, app=celery_app)
    
    response = {
        "job_id": job_id,
        "status": res.status
    }
    
    # Handle different task states
    if res.status == "PROGRESS":
        # Task is running; extract custom metadata updated during processing
        response.update(res.info or {})
    elif res.status == "SUCCESS":
        # Task finished; res.result contains output dict
        response.update({
            "stage": "completed",
            "progress": 100,
            "message": "Processing completed successfully.",
            "result": res.result
        })
    elif res.status == "FAILURE":
        # Task failed; res.info contains the exception description
        response.update({
            "stage": "failed",
            "progress": 100,
            "message": str(res.info)
        })
    else:
        # PENDING, RECEIVED, STARTED or unknown state
        response.update({
            "stage": "pending",
            "progress": 0,
            "message": "Waiting for task to be processed by worker..."
        })
        
    return response
