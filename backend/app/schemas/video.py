from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.models.video import VideoStatus


class MessageResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    detail: str


class DatabaseHealthResponse(BaseModel):
    database: str


class VideoResponse(BaseModel):
    id: UUID
    original_filename: str
    stored_filename: str
    content_type: str | None
    file_size: int
    status: VideoStatus
    error_message: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class VideoListResponse(BaseModel):
    count: int
    limit: int
    offset: int
    items: list[VideoResponse]


class UploadResponse(BaseModel):
    video_id: UUID
    job_id: str
    status: VideoStatus
    message: str


class StatusResponse(BaseModel):
    video_id: UUID
    status: VideoStatus
    error_message: str | None = None
    message: str


class JobStatusResponse(BaseModel):
    job_id: str
    state: str
    result: dict | str | None = None


class TranscriptSegmentCreate(BaseModel):
    start_time: float = Field(ge=0)
    end_time: float = Field(gt=0)
    text: str = Field(min_length=1, max_length=5000)
    score: float | None = Field(default=None, ge=0, le=1)

    @field_validator("text")
    @classmethod
    def strip_text(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("text cannot be blank")
        return cleaned


class TranscriptSegmentResponse(BaseModel):
    id: int
    video_id: UUID
    start_time: float
    end_time: float
    text: str
    score: float | None

    model_config = ConfigDict(from_attributes=True)


class SearchRequest(BaseModel):
    video_id: UUID
    query: str = Field(min_length=1, max_length=500)
    limit: int = Field(default=5, ge=1, le=20)

    @field_validator("query")
    @classmethod
    def strip_query(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("query cannot be blank")
        return cleaned


class SearchResult(BaseModel):
    timestamp: float
    end_time: float
    snippet: str
    confidence: float


class SearchResponse(BaseModel):
    video_id: UUID
    query: str
    result_count: int
    results: list[SearchResult]
