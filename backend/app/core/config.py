from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI Video Search Engine API"
    app_env: str = "development"
    api_version: str = "0.3.0"
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/video_search"
    upload_dir: Path = Path("uploads")
    max_upload_mb: int = Field(default=1024, gt=0)
    backend_cors_origins: str = "http://localhost:3000,http://localhost:5173"
    redis_url: str = "redis://localhost:6379/0"
    qdrant_url: str = "http://localhost:6333"
    allowed_video_extensions: str = ".mp4,.mpeg,.mov,.avi,.mkv,.webm"
    allowed_video_content_types: str = "video/mp4,video/mpeg,video/quicktime,video/x-msvideo,video/x-matroska,video/webm"
    testing: bool = False

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @field_validator("upload_dir", mode="before")
    @classmethod
    def normalize_upload_dir(cls, value: str | Path) -> Path:
        return Path(value)

    @property
    def cors_origins(self) -> list[str]:
        return _split_csv(self.backend_cors_origins)

    @property
    def video_extensions(self) -> set[str]:
        return {item.lower() for item in _split_csv(self.allowed_video_extensions)}

    @property
    def video_content_types(self) -> set[str]:
        return set(_split_csv(self.allowed_video_content_types))

    @property
    def max_upload_bytes(self) -> int:
        return self.max_upload_mb * 1024 * 1024


def _split_csv(value: str) -> list[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
