import re

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import TranscriptSegment
from app.schemas import SearchResult


def _tokenize(text: str) -> set[str]:
    return {token for token in re.findall(r"[a-zA-Z0-9]+", text.lower()) if token}


def rank_transcript_segments(db: Session, video_id, query: str, limit: int) -> list[SearchResult]:
    """Week 3 backend ranking until AI/Qdrant semantic search is connected."""
    query_tokens = _tokenize(query)
    if not query_tokens:
        return []

    stmt = select(TranscriptSegment).where(TranscriptSegment.video_id == video_id)
    segments = db.scalars(stmt).all()

    ranked = []
    for segment in segments:
        segment_tokens = _tokenize(segment.text)
        keyword_score = len(query_tokens & segment_tokens) / len(query_tokens)
        stored_score = segment.score or 0.0
        confidence = max(keyword_score, stored_score)
        if confidence > 0:
            ranked.append((confidence, segment.start_time, segment))

    ranked.sort(key=lambda item: (-item[0], item[1]))
    return [
        SearchResult(
            timestamp=segment.start_time,
            end_time=segment.end_time,
            snippet=segment.text,
            confidence=round(confidence, 3),
        )
        for confidence, _, segment in ranked[:limit]
    ]
