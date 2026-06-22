from uuid import uuid4
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams

client = QdrantClient(path="./qdrant_storage")
COLLECTION_NAME = "video_transcripts"

if not client.collection_exists(COLLECTION_NAME):
    client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=768, distance=Distance.COSINE)
    )


def insert_chunks_to_qdrant(video_id, chunks):
    """
    Stores transcript chunks for a specific video.
    """
    points = []
    for chunk in chunks:
        points.append(
            PointStruct(
                id=str(uuid4()),
                vector=chunk["embedding"], 
                payload={
                    "video_id": str(video_id),
                    "chunk_index": chunk["chunk_index"],
                    "start_time": chunk["start_time"],
                    "end_time": chunk["end_time"],
                    "text": chunk["text_snippet"]
                }
            )
        )
    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

def search(query_vector,video_id, top_k=5):
    result = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=top_k,
    )

    filtered=[]
    for pt in result.points:
        if pt.payload["video_id"] == str(video_id):
            filtered.append(pt)
    
    return filtered
    

def search_and_deduplicate(query_vector, video_id, fetch_limit=10, time_threshold=15.0, final_limit=5):
    """
    Fetches raw results and removes hits that are too close together in the video.
    """
    raw_results = search(query_vector,video_id, top_k=fetch_limit)
    
    deduplicated_results = []
    
    for point in raw_results:
        is_duplicate = False
        hit_start = point.payload["start_time"]
        
        for accepted in deduplicated_results:
            if abs(hit_start - accepted["start_time"]) <= time_threshold:
                is_duplicate = True
                break
        
        if not is_duplicate:
            deduplicated_results.append({
                "score": round(point.score, 4),
                "start_time": hit_start,
                "end_time": point.payload["end_time"],
                "text": point.payload["text"]
            })
            
        if len(deduplicated_results) == final_limit:
            break
            
    return deduplicated_results

