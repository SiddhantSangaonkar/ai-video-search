import whisper
import json

def run_whisper_test(audio_path):

    print("Loading Whisper 'base' model...")
    model = whisper.load_model("base")
    
    print(f"Transcribing audio file: {audio_path}...")
    result = model.transcribe(audio_path)
    
    print("\n--- Full Raw Transcript ---\n")
    print(result["text"])
    
    print("\n--- Segment Information (Sample) ---")
    for segment in result["segments"][:3]:
        print(f"[{segment['start']}s -> {segment['end']}s]: {segment['text']}")
        
    # Saving output to JSON file for later use
    with open("whisper_output.json", "w") as f:
        json.dump(result, f, indent=4)
    
if __name__ == "__main__":
    sample_aud="Recursion in 100 Seconds.mp3"
    run_whisper_test(sample_aud)