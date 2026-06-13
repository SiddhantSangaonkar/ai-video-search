from dataclasses import dataclass
from pathlib import Path
from uuid import uuid4

from fastapi import HTTPException, UploadFile, status

from app.core.config import Settings


@dataclass(frozen=True)
class StoredUpload:
    stored_filename: str
    file_size: int
    path: Path


def ensure_upload_dir(settings: Settings) -> Path:
    upload_dir = settings.upload_dir
    upload_dir.mkdir(parents=True, exist_ok=True)
    return upload_dir


def build_stored_filename(original_filename: str) -> str:
    suffix = Path(original_filename).suffix.lower()
    return f"{uuid4()}{suffix}"


def validate_upload_file(file: UploadFile, settings: Settings) -> None:
    filename = file.filename or ""
    suffix = Path(filename).suffix.lower()
    if suffix not in settings.video_extensions:
        allowed = ", ".join(sorted(settings.video_extensions))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported video extension. Allowed extensions: {allowed}.",
        )
    if file.content_type not in settings.video_content_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported video content type.",
        )


async def save_upload_file(file: UploadFile, settings: Settings) -> StoredUpload:
    validate_upload_file(file, settings)
    upload_dir = ensure_upload_dir(settings)
    stored_filename = build_stored_filename(file.filename or "uploaded-video")
    destination = upload_dir / stored_filename

    total_size = 0
    with destination.open("wb") as buffer:
        while chunk := await file.read(1024 * 1024):
            total_size += len(chunk)
            if total_size > settings.max_upload_bytes:
                destination.unlink(missing_ok=True)
                raise HTTPException(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    detail=f"Upload is larger than {settings.max_upload_mb} MB.",
                )
            buffer.write(chunk)

    if total_size == 0:
        destination.unlink(missing_ok=True)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Uploaded file is empty.")

    return StoredUpload(stored_filename=stored_filename, file_size=total_size, path=destination)
