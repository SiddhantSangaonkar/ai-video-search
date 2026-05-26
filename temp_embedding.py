from sentence_transformers import SentenceTransformer, util

def evaluate_semantic_search():
    model = SentenceTransformer('all-mpnet-base-v2')
    
    sentences = [
        " A recursive function is a function that calls itself inside of its own definition.",
        " It's like having a dream inside of a dream.",
        " When you have a recursive function that calls itself without anything to stop it, you have created an infinite loop.",
        "Database indexing significantly optimizes query retrieval performance times in SQL."
    ]
    
    embeddings = model.encode(sentences, convert_to_tensor=True)
    
    user_query = "Can you find the clip where they explain functions calling themselves?"
    query_embedding = model.encode(user_query, convert_to_tensor=True)
    
    print(f"User Search Query: '{user_query}'\n")
    print("Calculating similarity : ")
    
    # Compute cosine similarity between the query vector and all stored vectors
    cosine_scores = util.cos_sim(query_embedding, embeddings)[0]
    
    results = []
    for i in range(len(sentences)):
        results.append((cosine_scores[i].item(), sentences[i]))
        
    # Sort results by highest similarity score
    results.sort(key=lambda x: x[0], reverse=True)
    
    for score, text in results:
        print(f"[Match Score: {score:.4f}] -> Text: {text}")

if __name__ == "__main__":
    evaluate_semantic_search()