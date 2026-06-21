// export default function UploadSection() {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 text-center">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload a Video</h2>
      
//       {/* 1. cursor-pointer removed from this div */}
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-inner group">
        
//         <svg className="w-16 h-16 text-gray-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path>
//         </svg>
        
//         <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-blue-700">Drag and drop your video file here</p>
        
//         {/* 2. pointer-events-none removed, and cursor-pointer added explicitly here */}
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg cursor-pointer">
//           Browse Files
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';

// export default function UploadSection() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle' | 'uploading' | 'processing' | 'success'

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setUploadStatus('idle'); 
//     }
//   };

//   const handleUpload = () => {
//     if (!videoFile) return;

//     setUploadStatus('uploading');

//     setTimeout(() => {
//       setUploadStatus('processing');

//       setTimeout(() => {
//         setUploadStatus('success');
//       }, 3000);
      
//     }, 2000);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 text-center">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload a Video</h2>
      
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-inner group">
        
//         <svg className="w-16 h-16 text-gray-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path>
//         </svg>
        
//         {videoFile ? (
//           <p className="text-green-600 mb-4 font-semibold">
//             Selected: {videoFile.name}
//           </p>
//         ) : (
//           <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-blue-700">
//             Drag and drop your video file here
//           </p>
//         )}

//         <input 
//           type="file" 
//           id="video-upload" 
//           accept="video/*" 
//           className="hidden" 
//           onChange={handleFileChange} 
//         />
        
//         {/* BUTTON CONTAINER */}
//         <div className="flex gap-4 mt-2 items-center justify-center">
          
//           {/* RESTORED: Your original blue styling for the Browse button */}
//           <label 
//             htmlFor="video-upload" 
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg cursor-pointer"
//           >
//             {videoFile ? "Change File" : "Browse Files"}
//           </label>

//           {/* NEW: Green styling for the Upload button so it stands out next to the blue */}
//           {videoFile && uploadStatus === 'idle' && (
//             <button 
//               onClick={handleUpload}
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg"
//             >
//               Upload to Server
//             </button>
//           )}
//         </div>

//         {/* Dynamic Loading Messages */}
//         {uploadStatus === 'uploading' && (
//           <div className="mt-6 text-blue-600 font-semibold animate-pulse">
//             Uploading to server... 
//           </div>
//         )}
        
//         {uploadStatus === 'processing' && (
//           <div className="mt-6 text-orange-500 font-semibold animate-pulse">
//             Processing video (Extracting audio)...
//           </div>
//         )}

//         {uploadStatus === 'success' && (
//           <div className="mt-6 text-green-600 font-bold">
//             ✓ Upload and processing complete!
//           </div>
//         )}
        
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// // 1. Import your new master plumbing
// import { VideoAPI } from '../api/client'; 

// export default function UploadSection() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('idle'); 

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setUploadStatus('idle'); 
//     }
//   };

//   const handleUpload = async () => { // Added 'async' here
//     if (!videoFile) return;

//     setUploadStatus('uploading');

//     // =========================================================
//     // THE REAL BACKEND CODE (Waiting for Sarna)
//     // =========================================================
//     /*
//     try {
//       // 1. Send the file via Axios
//       const response = await VideoAPI.uploadVideo(videoFile);
      
//       // 2. If Sarna's server replies with a 200 OK, update the UI
//       if (response.status === 200) {
//         setUploadStatus('success');
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploadStatus('error'); // We will build this red error UI next
//     }
//     */

//     // =========================================================
//     // YOUR CURRENT MOCK LOGIC (Keep this active for your meeting)
//     // =========================================================
//     setTimeout(() => {
//       setUploadStatus('processing');
//       setTimeout(() => {
//         setUploadStatus('success');
//       }, 3000);
//     }, 2000);
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 text-center">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload a Video</h2>
      
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-inner group">
        
//         <svg className="w-16 h-16 text-gray-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path>
//         </svg>
        
//         {videoFile ? (
//           <p className="text-green-600 mb-4 font-semibold">
//             Selected: {videoFile.name}
//           </p>
//         ) : (
//           <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-blue-700">
//             Drag and drop your video file here
//           </p>
//         )}

//         <input 
//           type="file" 
//           id="video-upload" 
//           accept="video/*" 
//           className="hidden" 
//           onChange={handleFileChange} 
//         />
        
//         <div className="flex gap-4 mt-2 items-center justify-center">
//           <label 
//             htmlFor="video-upload" 
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg cursor-pointer"
//           >
//             {videoFile ? "Change File" : "Browse Files"}
//           </label>

//           {videoFile && uploadStatus === 'idle' && (
//             <button 
//               onClick={handleUpload}
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg"
//             >
//               Upload to Server
//             </button>
//           )}
//         </div>

//         {uploadStatus === 'uploading' && (
//           <div className="mt-6 text-blue-600 font-semibold animate-pulse">
//             Uploading to server... 
//           </div>
//         )}
        
//         {uploadStatus === 'processing' && (
//           <div className="mt-6 text-orange-500 font-semibold animate-pulse">
//             Processing video (Extracting audio)...
//           </div>
//         )}

//         {uploadStatus === 'success' && (
//           <div className="mt-6 text-green-600 font-bold">
//             ✓ Upload and processing complete!
//           </div>
//         )}
        
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { VideoAPI } from '../api/client'; 

// export default function UploadSection() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('idle'); 

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setUploadStatus('idle'); 
//     }
//   };

//   const handleUpload = async () => {
//     if (!videoFile) return;

//     // 1. Start the UI in the uploading state
//     setUploadStatus('uploading');

//     try {
//       // 2. Call the Real API, and pass a function to track progress
//       const response = await VideoAPI.uploadVideo(videoFile, (progressEvent) => {
        
//         // Calculate the exact percentage of the file sent over Wi-Fi
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        
//         // 3. The moment the file is 100% sent to Sarna's laptop, switch the UI to 'processing'!
//         if (percentCompleted === 100) {
//           setUploadStatus('processing');
//         }
//       });
      
//       // 4. When Sarna's server finally replies "200 OK", show success
//       if (response.status === 200) {
//         setUploadStatus('success');
//       }
      
//     } catch (error) {
//       // 5. Catch server crashes or network failures safely
//       console.error("Upload failed:", error);
//       setUploadStatus('error'); 
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 text-center">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload a Video</h2>
      
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-inner group">
        
//         <svg className="w-16 h-16 text-gray-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path>
//         </svg>
        
//         {videoFile ? (
//           <p className="text-green-600 mb-4 font-semibold">
//             Selected: {videoFile.name}
//           </p>
//         ) : (
//           <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-blue-700">
//             Drag and drop your video file here
//           </p>
//         )}

//         <input 
//           type="file" 
//           id="video-upload" 
//           accept="video/*" 
//           className="hidden" 
//           onChange={handleFileChange} 
//         />
        
//         <div className="flex gap-4 mt-2 items-center justify-center">
//           <label 
//             htmlFor="video-upload" 
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg cursor-pointer"
//           >
//             {videoFile ? "Change File" : "Browse Files"}
//           </label>

//           {videoFile && uploadStatus === 'idle' && (
//             <button 
//               onClick={handleUpload}
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg"
//             >
//               Upload to Server
//             </button>
//           )}
//         </div>

//         {uploadStatus === 'uploading' && (
//           <div className="mt-6 text-blue-600 font-semibold animate-pulse">
//             Uploading to server... 
//           </div>
//         )}
        
//         {uploadStatus === 'processing' && (
//           <div className="mt-6 text-orange-500 font-semibold animate-pulse">
//             Processing video (Extracting audio)...
//           </div>
//         )}

//         {uploadStatus === 'success' && (
//           <div className="mt-6 text-green-600 font-bold">
//             ✓ Upload and processing complete!
//           </div>
//         )}

//         {/* The New Error State */}
//         {uploadStatus === 'error' && (
//           <div className="mt-6 text-red-600 font-bold">
//             ❌ Server connection failed. Is the backend running?
//           </div>
//         )}
        
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { VideoAPI } from '../api/client'; 

// // 1. Accept the new prop from App.jsx
// export default function UploadSection({ onVideoSelect }) {
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('idle'); 

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setUploadStatus('idle'); 
      
//       // 2. Instantly send the file up to App.jsx to update the video player!
//       if (onVideoSelect) {
//         onVideoSelect(file);
//       }
//     }
//   };

//   const handleUpload = async () => {
//     if (!videoFile) return;
//     setUploadStatus('uploading');

//     try {
//       const response = await VideoAPI.uploadVideo(videoFile, (progressEvent) => {
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         if (percentCompleted === 100) {
//           setUploadStatus('processing');
//         }
//       });
      
//       if (response.status === 200) {
//         setUploadStatus('success');
//       }
      
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploadStatus('error'); 
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 text-center">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload a Video</h2>
      
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-inner group">
        
//         <svg className="w-16 h-16 text-gray-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path>
//         </svg>
        
//         {videoFile ? (
//           <p className="text-green-600 mb-4 font-semibold">
//             Selected: {videoFile.name}
//           </p>
//         ) : (
//           <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-blue-700">
//             Drag and drop your video file here
//           </p>
//         )}

//         <input 
//           type="file" 
//           id="video-upload" 
//           accept="video/*" 
//           className="hidden" 
//           onChange={handleFileChange} 
//         />
        
//         <div className="flex gap-4 mt-2 items-center justify-center">
//           <label 
//             htmlFor="video-upload" 
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg cursor-pointer"
//           >
//             {videoFile ? "Change File" : "Browse Files"}
//           </label>

//           {videoFile && uploadStatus === 'idle' && (
//             <button 
//               onClick={handleUpload}
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg"
//             >
//               Upload to Server
//             </button>
//           )}
//         </div>

//         {uploadStatus === 'uploading' && (
//           <div className="mt-6 text-blue-600 font-semibold animate-pulse">
//             Uploading to server... 
//           </div>
//         )}
        
//         {uploadStatus === 'processing' && (
//           <div className="mt-6 text-orange-500 font-semibold animate-pulse">
//             Processing video (Extracting audio)...
//           </div>
//         )}

//         {uploadStatus === 'success' && (
//           <div className="mt-6 text-green-600 font-bold">
//             ✓ Upload and processing complete!
//           </div>
//         )}

//         {uploadStatus === 'error' && (
//           <div className="mt-6 text-red-600 font-bold">
//             ❌ Server connection failed. Is the backend running?
//           </div>
//         )}
        
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { VideoAPI } from '../api/client'; 

// export default function UploadSection({ onVideoSelect, onUploadSuccess }) {
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('idle'); 
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setUploadStatus('idle'); 
//       setUploadProgress(0);
//       if (onVideoSelect) onVideoSelect(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (!videoFile) return;
//     setUploadStatus('uploading');

//     try {
//       const response = await VideoAPI.uploadVideo(videoFile, (progressEvent) => {
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         setUploadProgress(percentCompleted);
//         if (percentCompleted === 100) {
//           setUploadStatus('processing');
//         }
//       });
      
//       if (response.status === 200) {
//         setUploadStatus('success');
//         // Automatically move to the search page after a short delay
//         setTimeout(onUploadSuccess, 1000); 
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploadStatus('error'); 
//     }
//   };

//   const resetFile = () => {
//     setVideoFile(null);
//     setUploadStatus('idle');
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto mt-20 p-1 relative">
//       {/* Glowing border effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-xl rounded-2xl pointer-events-none"></div>
      
//       <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 p-10 rounded-2xl shadow-2xl text-center">
        
//         {/* State: Idle / Uploading / Processing / Success */}
//         {uploadStatus !== 'error' && (
//           <div className="flex flex-col items-center">
//             <h2 className="text-2xl font-bold tracking-wider text-slate-200 mb-8">VIDEO UPLOAD</h2>
            
//             <div className="relative w-48 h-48 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)] group transition-all duration-300">
//               {uploadStatus === 'uploading' || uploadStatus === 'processing' ? (
//                  <div className="w-full h-full rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
//               ) : (
//                 <label htmlFor="video-upload" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer rounded-full hover:bg-blue-500/10 transition-colors">
//                   <svg className="w-10 h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path></svg>
//                   <span className="text-sm font-medium text-slate-400 group-hover:text-blue-300 px-4">
//                     {videoFile ? videoFile.name : "Drag and drop your video file here"}
//                   </span>
//                 </label>
//               )}
//               <input type="file" id="video-upload" accept="video/*" className="hidden" onChange={handleFileChange} disabled={uploadStatus === 'uploading'} />
//             </div>

//             {uploadStatus === 'uploading' && (
//               <div className="w-full max-w-xs">
//                 <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
//                   <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
//                 </div>
//                 <p className="text-blue-400 text-sm mt-3 tracking-widest animate-pulse">UPLOADING ({uploadProgress}%)</p>
//               </div>
//             )}

//             {uploadStatus === 'processing' && <p className="text-purple-400 text-sm tracking-widest animate-pulse">PROCESSING VIDEO...</p>}
//             {uploadStatus === 'success' && <p className="text-green-400 text-sm tracking-widest">✓ SYSTEM READY</p>}

//             {videoFile && uploadStatus === 'idle' && (
//               <button onClick={handleUpload} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest rounded shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
//                 INITIALIZE UPLOAD
//               </button>
//             )}
//           </div>
//         )}

//         {/* State: Specific Custom Error UI */}
//         {uploadStatus === 'error' && (
//            <div className="flex flex-col items-center py-6">
//              <svg className="w-20 h-20 text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//              </svg>
//              <h3 className="text-3xl font-extrabold tracking-widest text-red-500 mb-2">UPLOAD ERROR</h3>
//              <p className="text-red-400/80 text-sm tracking-widest mb-10">FILE CORRUPTED OR TOO LARGE. (ERR_004)</p>
             
//              <div className="flex gap-4">
//                 <button onClick={handleUpload} className="px-6 py-2 border border-red-500/50 bg-red-500/10 text-red-400 font-semibold tracking-wider rounded hover:bg-red-500/20 transition-all">
//                   RETRY UPLOAD
//                 </button>
//                 <button onClick={resetFile} className="px-6 py-2 border border-slate-600 text-slate-300 font-semibold tracking-wider rounded hover:bg-slate-800 transition-all">
//                   CHOOSE NEW FILE
//                 </button>
//              </div>
//            </div>
//         )}

//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';
// import { VideoAPI } from '../api/client'; 

// export default function UploadSection({ onVideoSelect, onUploadSuccess }) {
//   const [videoFile, setVideoFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('idle'); 
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       setUploadStatus('idle'); 
//       setUploadProgress(0);
//       if (onVideoSelect) onVideoSelect(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (!videoFile) return;
//     setUploadStatus('uploading');

//     try {
//       const response = await VideoAPI.uploadVideo(videoFile, (progressEvent) => {
//         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         setUploadProgress(percentCompleted);
//         if (percentCompleted === 100) {
//           setUploadStatus('processing');
//         }
//       });
      
//       if (response.status === 200) {
//         setUploadStatus('success');
//         setTimeout(onUploadSuccess, 1000); 
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//       setUploadStatus('error'); 
//     }
//   };

//   const resetFile = () => {
//     setVideoFile(null);
//     setUploadStatus('idle');
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto mt-20 p-1 relative flex flex-col items-center">
//       {/* Glowing border effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-xl rounded-2xl pointer-events-none"></div>
      
//       <div className="relative w-full bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 p-10 rounded-2xl shadow-2xl text-center">
        
//         {/* State: Idle / Uploading / Processing / Success */}
//         {uploadStatus !== 'error' && (
//           <div className="flex flex-col items-center">
//             <h2 className="text-2xl font-bold tracking-wider text-slate-200 mb-8">VIDEO UPLOAD</h2>
            
//             <div className="relative w-48 h-48 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)] group transition-all duration-300">
//               {uploadStatus === 'uploading' || uploadStatus === 'processing' ? (
//                  <div className="w-full h-full rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
//               ) : (
//                 <label htmlFor="video-upload" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer rounded-full hover:bg-blue-500/10 transition-colors">
//                   <svg className="w-10 h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path></svg>
//                   <span className="text-sm font-medium text-slate-400 group-hover:text-blue-300 px-4">
//                     {videoFile ? videoFile.name : "Drag and drop your video file here"}
//                   </span>
//                 </label>
//               )}
//               <input type="file" id="video-upload" accept="video/*" className="hidden" onChange={handleFileChange} disabled={uploadStatus === 'uploading'} />
//             </div>

//             {uploadStatus === 'uploading' && (
//               <div className="w-full max-w-xs">
//                 <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
//                   <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
//                 </div>
//                 <p className="text-blue-400 text-sm mt-3 tracking-widest animate-pulse">UPLOADING ({uploadProgress}%)</p>
//               </div>
//             )}

//             {uploadStatus === 'processing' && <p className="text-purple-400 text-sm tracking-widest animate-pulse">PROCESSING VIDEO...</p>}
//             {uploadStatus === 'success' && <p className="text-green-400 text-sm tracking-widest">✓ SYSTEM READY</p>}

//             {videoFile && uploadStatus === 'idle' && (
//               <button onClick={handleUpload} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest rounded shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
//                 INITIALIZE UPLOAD
//               </button>
//             )}
//           </div>
//         )}

//         {/* State: Specific Custom Error UI */}
//         {uploadStatus === 'error' && (
//            <div className="flex flex-col items-center py-6">
//              <svg className="w-20 h-20 text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//              </svg>
//              <h3 className="text-3xl font-extrabold tracking-widest text-red-500 mb-2">UPLOAD ERROR</h3>
//              <p className="text-red-400/80 text-sm tracking-widest mb-10">FILE CORRUPTED OR TOO LARGE. (ERR_004)</p>
             
//              <div className="flex gap-4">
//                 <button onClick={handleUpload} className="px-6 py-2 border border-red-500/50 bg-red-500/10 text-red-400 font-semibold tracking-wider rounded hover:bg-red-500/20 transition-all">
//                   RETRY UPLOAD
//                 </button>
//                 <button onClick={resetFile} className="px-6 py-2 border border-slate-600 text-slate-300 font-semibold tracking-wider rounded hover:bg-slate-800 transition-all">
//                   CHOOSE NEW FILE
//                 </button>
//              </div>
//            </div>
//         )}
//       </div>

//       {/* --- DEV BYPASS BUTTON --- */}
//       <button 
//         onClick={onUploadSuccess}
//         className="mt-8 text-xs tracking-[0.2em] text-slate-500 hover:text-blue-400 transition-colors border-b border-transparent hover:border-blue-400 pb-1"
//       >
//         DEV BYPASS: SKIP TO SEARCH DASHBOARD
//       </button>

//     </div>
//   );
// }


import { useState } from 'react';
import { VideoAPI } from '../api/client'; 

export default function UploadSection({ onVideoSelect, onUploadSuccess }) {
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); 
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(''); // New: To show what the AI is doing

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setUploadStatus('idle'); 
      setUploadProgress(0);
      setStatusMessage('');
      if (onVideoSelect) onVideoSelect(file);
    }
  };

  // --- THE NEW ENTERPRISE POLLING LOOP ---
  const pollServerStatus = async (videoId) => {
    try {
      const response = await VideoAPI.checkVideoStatus(videoId);
      const currentStatus = response.data.status; // e.g., 'processing', 'completed', 'failed'

      if (currentStatus === 'ready') {
        // The AI is finished!
        setUploadStatus('success');
        setTimeout(() => onUploadSuccess(videoId), 1500); 
      } else if (currentStatus === 'failed') {
        // Something broke on the backend
        setUploadStatus('error');
        setStatusMessage('AI PROCESSING FAILED. (ERR_500)');
      } else {
        // Still processing. Wait 5 seconds and ask again.
        setStatusMessage('AI EXTRACTING TRANSCRIPT... PLEASE WAIT.');
        setTimeout(() => pollServerStatus(videoId), 5000); 
      }
    } catch (error) {
      console.error("Polling failed:", error);
      // Don't immediately crash on a network blip. Try again in 5 seconds.
      setTimeout(() => pollServerStatus(videoId), 5000);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;
    setUploadStatus('uploading');

    try {
      // 1. Send the heavy file to Sarna's server
      const response = await VideoAPI.uploadVideo(videoFile, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
        if (percentCompleted === 100) {
          setUploadStatus('processing');
          setStatusMessage('FILE SECURED. INITIALIZING AI...');
        }
      });
      
      // 2. Sarna receives the file and hands us a receipt (video_id)
      if ((response.status === 200 || response.status === 201) && response.data.video_id) {
        const videoId = response.data.video_id;
        
        // 3. Start the polling loop with the buzzer!
        pollServerStatus(videoId);
      } else {
        throw new Error("No Video ID returned from server.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus('error'); 
      setStatusMessage('NETWORK UPLOAD INTERRUPTED. (ERR_004)');
    }
  };

  const resetFile = () => {
    setVideoFile(null);
    setUploadStatus('idle');
    setStatusMessage('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-20 p-1 relative flex flex-col items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-xl rounded-2xl pointer-events-none"></div>
      
      <div className="relative w-full bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 p-10 rounded-2xl shadow-2xl text-center">
        
        {uploadStatus !== 'error' && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold tracking-wider text-slate-200 mb-8">VIDEO UPLOAD</h2>
            
            <div className="relative w-48 h-48 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(59,130,246,0.1)] group transition-all duration-300">
              {uploadStatus === 'uploading' || uploadStatus === 'processing' ? (
                 <div className="w-full h-full rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
              ) : (
                <label htmlFor="video-upload" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer rounded-full hover:bg-blue-500/10 transition-colors">
                  <svg className="w-10 h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path></svg>
                  <span className="text-sm font-medium text-slate-400 group-hover:text-blue-300 px-4">
                    {videoFile ? videoFile.name : "Drag and drop your video file here"}
                  </span>
                </label>
              )}
              <input type="file" id="video-upload" accept="video/*" className="hidden" onChange={handleFileChange} disabled={uploadStatus === 'uploading'} />
            </div>

            {/* The Upload Progress Bar */}
            {uploadStatus === 'uploading' && (
              <div className="w-full max-w-xs">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p className="text-blue-400 text-sm mt-3 tracking-widest animate-pulse">UPLOADING ({uploadProgress}%)</p>
              </div>
            )}

            {/* The New Enterprise Polling Status Messages */}
            {uploadStatus === 'processing' && <p className="text-purple-400 text-sm tracking-widest animate-pulse uppercase">{statusMessage}</p>}
            {uploadStatus === 'success' && <p className="text-green-400 text-sm tracking-widest">✓ NEURAL NETWORK READY</p>}

            {videoFile && uploadStatus === 'idle' && (
              <button onClick={handleUpload} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest rounded shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all">
                INITIALIZE UPLOAD
              </button>
            )}
          </div>
        )}

        {/* Dynamic Error State */}
        {uploadStatus === 'error' && (
           <div className="flex flex-col items-center py-6">
             <svg className="w-20 h-20 text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
             <h3 className="text-3xl font-extrabold tracking-widest text-red-500 mb-2">SYSTEM ERROR</h3>
             <p className="text-red-400/80 text-sm tracking-widest mb-10">{statusMessage}</p>
             
             <div className="flex gap-4">
                <button onClick={handleUpload} className="px-6 py-2 border border-red-500/50 bg-red-500/10 text-red-400 font-semibold tracking-wider rounded hover:bg-red-500/20 transition-all">
                  RETRY
                </button>
                <button onClick={resetFile} className="px-6 py-2 border border-slate-600 text-slate-300 font-semibold tracking-wider rounded hover:bg-slate-800 transition-all">
                  CHOOSE NEW FILE
                </button>
             </div>
           </div>
        )}
      </div>

      <button onClick={onUploadSuccess} className="mt-8 text-xs tracking-[0.2em] text-slate-500 hover:text-blue-400 transition-colors border-b border-transparent hover:border-blue-400 pb-1">
        DEV BYPASS: SKIP TO SEARCH DASHBOARD
      </button>

    </div>
  );
}