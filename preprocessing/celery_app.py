import os
# pyrefly: ignore [missing-import]
from celery import Celery

redis_url = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

app = Celery(
    "preprocessing",
    broker=redis_url,
    backend=redis_url,
    include=["preprocessing.tasks"]
)

# Configure Celery behavior
app.conf.update(
    task_track_started=True,     # Track started state in backend
    result_extended=True,        # Include extra metadata in backend (e.g. task args/kwargs)
    timezone="UTC",
    enable_utc=True,
)

if __name__ == "__main__":
    app.start()
