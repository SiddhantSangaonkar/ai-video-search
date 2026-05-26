import whisper
from sentence_transformers import SentenceTransformer

def run_ingestion_pipeline(audio_path: str, chunk_duration: float = 30.0, overlap: float = 5.0):
    whisper_model = whisper.load_model("base")
    embedding_model = SentenceTransformer("all-mpnet-base-v2")
    
    # transcribe audio to get segments
    print(f"Transcribing {audio_path}...")
    transcript_data = whisper_model.transcribe(audio_path)
    segments = transcript_data["segments"]
    
    processed_chunks = []
    
    # two pointer approach to create overlapping chunks
    current_chunk_text = []
    current_start = 0.0
    
    print("Executing sliding-window chunking logic...")
    for i, seg in enumerate(segments):
        seg_start = seg["start"]
        seg_end = seg["end"]
        seg_text = seg["text"].strip()
        
        current_chunk_text.append(seg_text)
        
        # Check if we have filled our ~30 second window or reached the last segment
        if (seg_end - current_start >= chunk_duration) or (i == len(segments) - 1):
            full_text = " ".join(current_chunk_text)
            current_end = seg_end
            
            # generate the 768-dimensional text embedding
            embedding_vector = embedding_model.encode(full_text).tolist()
            
            processed_chunks.append({
                "chunk_index": len(processed_chunks),
                "start_time": round(current_start, 2),
                "end_time": round(current_end, 2),
                "text_snippet": full_text,
                "embedding": embedding_vector  # List of 768 floats
            })
     
            # To create an overlap, find the first segment that starts within 
            # the last 'overlap' seconds of our current window.
            overlap_target_time = current_end - overlap
            current_chunk_text = []
            new_start_found = False
            
            # Look back through segments to reset the window correctly
            for backtrack_seg in segments:
                if backtrack_seg["start"] >= overlap_target_time and backtrack_seg["end"] <= current_end:
                    if not new_start_found:
                        current_start = backtrack_seg["start"]
                        new_start_found = True
                    current_chunk_text.append(backtrack_seg["text"].strip())
            
            # Fallback if no clean segment breakdown exists in the overlap zone
            if not new_start_found:
                current_start = current_end - overlap
                
    return processed_chunks

if __name__ == "__main__":
    
    chunks = run_ingestion_pipeline("audio.wav")
    
    print(f"\nSuccessfully generated {len(chunks)} overlapping chunks.")
    if chunks:
        print("\n--- Example Data Structure for Chunk 0 ---")
        print(f"Time: {chunks[0]['start_time']}s -> {chunks[0]['end_time']}s")
        print(f"Snippet: {chunks[0]['text_snippet']}")
        print(f"Embedding dimensions: {len(chunks[0]['embedding'])}") # Must be 768