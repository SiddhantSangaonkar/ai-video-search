import axios from 'axios';

// 1. Pointing exactly to your FastAPI server (No /api at the end!)
export const apiClient = axios.create({
  baseURL: 'http://localhost:8000', 
});

// 2. The API Routes
export const VideoAPI = {
  
  // THE UPLOAD ROUTE
  uploadVideo: async (videoFile, onProgress) => {
    const formData = new FormData();
    // Use 'file' instead of 'video' to match FastAPI's standard UploadFile naming
    formData.append('file', videoFile); 

    // Notice: NO manual headers here! Let the browser handle the multipart boundary.
    return apiClient.post('/upload', formData, {
      onUploadProgress: onProgress 
    });
  },

  // THE SEARCH ROUTE
  searchVideo: async (videoId, searchQuery) => {
    // Send both variables exactly how your backend expects them
    return apiClient.post('/search', {
      video_id: videoId, 
      query: searchQuery
    });
  }, 

  // THE POLLING ROUTE
  checkVideoStatus: async (videoId) => {
    // This allows your React app to ask Celery "Are you done processing?"
    return apiClient.get(`/status/${videoId}`);
  }
};
// import axios from 'axios';

// // 1. Sarna's Postal Service (For Video Uploads)
// export const uploadClient = axios.create({
//   // Paste Sarna's Ngrok link right here (make sure to keep the /api at the end if she uses it)
//   baseURL: 'https://tapeless-bacteria-concert.ngrok-free.dev', 
//   headers: {
//     'ngrok-skip-browser-warning': 'true' // Bypasses the Ngrok HTML warning screen
//   }
// });

// // 2. Rupender's Postal Service (For AI Search)
// export const aiClient = axios.create({
//   // Paste Rupender's Ngrok link right here
//   baseURL: 'https://tapeless-bacteria-concert.ngrok-free.dev', 
//   headers: {
//     'ngrok-skip-browser-warning': 'true' // Bypasses the Ngrok HTML warning screen
//   }
// });

// // 3. The API Routes
// export const VideoAPI = {
  
//   // This routes specifically to Sarna's server
//   // uploadVideo: async (videoFile, onProgress) => {
//   //   const formData = new FormData();
//   //   formData.append('file', videoFile);

//   //   return uploadClient.post('/upload', formData, {
//   //     headers: {
//   //       'Content-Type': 'multipart/form-data',
//   //     },
//   //     onUploadProgress: onProgress 
//   //   });
//   // },
//   uploadVideo: async (videoFile, onProgress) => {
//     const formData = new FormData();
//     formData.append('file', videoFile); 

//     // CHANGED: We completely removed the headers object!
//     return uploadClient.post('/upload', formData, {
//       onUploadProgress: onProgress 
//     });
//   },

//   // This routes specifically to Rupender's server
//   // searchVideo: async (query) => {
//   //   return aiClient.post('/search', { query: query });
//   // },
//   searchVideo: async (videoId, searchQuery) => {
//     // Send both variables exactly how Rupender spelled them
//     return aiClient.post('/search', {
//       video_id: videoId, 
//       query: searchQuery
//     });
//   }, 

//   checkVideoStatus: async (videoId) => {
//     return uploadClient.get(`/status/${videoId}`);
//   }
// };