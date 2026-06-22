import re

# from sqlalchemy import select
from sqlalchemy.orm import Session
from app.services.ingestion_pipeline import semantic_search
from app.schemas import SearchResult

# from app.models import TranscriptSegment


def rank_transcript_segments(db: Session, video_id, query: str, limit: int) -> list[SearchResult]:
    """
    Qdrant-based semantic search.
    Maintains the same interface expected by the API layer.
    """

    if not query.strip():
        return []

    results = semantic_search(
        video_id=str(video_id),
        query=query,
        limit=limit
    )

    return [
        SearchResult(
            timestamp=result["start_time"],
            end_time=result["end_time"],
            snippet=result["text"],
            confidence=round(float(result["score"]), 3),
        )
        for result in results
    ]