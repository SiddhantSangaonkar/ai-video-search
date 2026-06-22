FROM python:3.11-slim

# Install system dependencies (FFmpeg, ffprobe for processing, curl for healthchecks)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Upgrade pip to avoid hash-mismatch bugs in older pip versions
RUN pip install --no-cache-dir --upgrade pip

# Copy requirements files to leverage Docker caching
COPY backend/requirements.txt /app/backend_requirements.txt
COPY preprocessing/requirements.txt /app/preprocessing_requirements.txt

# Install python dependencies
RUN pip install --no-cache-dir -r /app/backend_requirements.txt \
    && pip install --no-cache-dir -r /app/preprocessing_requirements.txt

# Copy the rest of the application code
COPY . /app

# Expose FastAPI port
EXPOSE 8000
