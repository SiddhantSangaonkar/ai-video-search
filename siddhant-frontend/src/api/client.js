import axios from 'axios';

// 1. The Master Axios Instance
export const apiClient = axios.create({
  // When Sarna gives you her IP or Ngrok link, paste it right here!
  baseURL: 'http://localhost:5000/api', 
});

// 2. The API Routes
export const VideoAPI = {
  
  // The Real Upload Route
  uploadVideo: async (videoFile, onProgress) => {
    // Package the raw binary file into a network-safe format
    const formData = new FormData();
    formData.append('video', videoFile);

    // Fire the POST request and attach the progress tracker
    return apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress 
    });
  },

  // The Real Search Route (We will wire this into App.jsx next)
  searchVideo: async (query) => {
    return apiClient.post('/search', { query: query });
  }
};