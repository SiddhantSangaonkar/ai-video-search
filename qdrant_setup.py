from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams

client = QdrantClient(path="./qdrant_storage")

# client.create_collection(
#     collection_name="video_transcripts",
#     vectors_config=VectorParams(size=768, distance=Distance.COSINE)
# )

# print(client.get_collections())


def insert_chunks_to_qdrant(chunks):
    points = []
    for chunk in chunks:
        points.append(
            PointStruct(
                id=chunk["chunk_index"],
                vector=chunk["embedding"], 
                payload={
                    "start_time": chunk["start_time"],
                    "end_time": chunk["end_time"],
                    "text": chunk["text_snippet"]
                }
            )
        )
    client.upsert(
        collection_name="video_transcripts",
        points=points
    )

def search(query_vector, top_k=5):
    result = client.query_points(
        collection_name="video_transcripts",
        query=query_vector,
        limit=top_k,
    )

    return result.points

def search_and_deduplicate(query_vector, fetch_limit=10, time_threshold=15.0, final_limit=3):
    """
    Fetches raw results and removes hits that are too close together in the video.
    """
    raw_results = search(query_vector, top_k=fetch_limit)
    
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
                "id": point.id,
                "score": round(point.score, 4),
                "start_time": hit_start,
                "end_time": point.payload["end_time"],
                "text": point.payload["text"]
            })
            
        if len(deduplicated_results) == final_limit:
            break
            
    return deduplicated_results