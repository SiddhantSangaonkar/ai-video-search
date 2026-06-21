// import axios from 'axios';

// // 1. The Master Axios Instance
// export const apiClient = axios.create({
//   // When Sarna gives you her IP or Ngrok link, paste it right here!
//   baseURL: 'http://localhost:5000/api', 
// });

// // 2. The API Routes
// export const VideoAPI = {
  
//   // The Real Upload Route
//   uploadVideo: async (videoFile, onProgress) => {
//     // Package the raw binary file into a network-safe format
//     const formData = new FormData();
//     formData.append('video', videoFile);

//     // Fire the POST request and attach the progress tracker
//     return apiClient.post('/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       onUploadProgress: onProgress 
//     });
//   },

//   // The Real Search Route (We will wire this into App.jsx next)
//   searchVideo: async (query) => {
//     return apiClient.post('/search', { query: query });
//   }
// };

import axios from 'axios';

// 1. Sarna's Postal Service (For Video Uploads)
export const uploadClient = axios.create({
  // Paste Sarna's Ngrok link right here (make sure to keep the /api at the end if she uses it)
  baseURL: 'https://tapeless-bacteria-concert.ngrok-free.dev', 
  headers: {
    'ngrok-skip-browser-warning': 'true' // Bypasses the Ngrok HTML warning screen
  }
});

// 2. Rupender's Postal Service (For AI Search)
export const aiClient = axios.create({
  // Paste Rupender's Ngrok link right here
  baseURL: 'https://tapeless-bacteria-concert.ngrok-free.dev', 
  headers: {
    'ngrok-skip-browser-warning': 'true' // Bypasses the Ngrok HTML warning screen
  }
});

// 3. The API Routes
export const VideoAPI = {
  
  // This routes specifically to Sarna's server
  // uploadVideo: async (videoFile, onProgress) => {
  //   const formData = new FormData();
  //   formData.append('file', videoFile);

  //   return uploadClient.post('/upload', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     onUploadProgress: onProgress 
  //   });
  // },
  uploadVideo: async (videoFile, onProgress) => {
    const formData = new FormData();
    formData.append('file', videoFile); 

    // CHANGED: We completely removed the headers object!
    return uploadClient.post('/upload', formData, {
      onUploadProgress: onProgress 
    });
  },

  // This routes specifically to Rupender's server
  // searchVideo: async (query) => {
  //   return aiClient.post('/search', { query: query });
  // },
  searchVideo: async (videoId, searchQuery) => {
    // Send both variables exactly how Rupender spelled them
    return aiClient.post('/search', {
      video_id: videoId, 
      query: searchQuery
    });
  }, 

  checkVideoStatus: async (videoId) => {
    return uploadClient.get(`/status/${videoId}`);
  }
};