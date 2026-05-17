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

import { useState } from 'react';

export default function UploadSection() {
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle' | 'uploading' | 'processing' | 'success'

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setUploadStatus('idle'); 
    }
  };

  const handleUpload = () => {
    if (!videoFile) return;

    setUploadStatus('uploading');

    setTimeout(() => {
      setUploadStatus('processing');

      setTimeout(() => {
        setUploadStatus('success');
      }, 3000);
      
    }, 2000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 text-center">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload a Video</h2>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-inner group">
        
        <svg className="w-16 h-16 text-gray-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path>
        </svg>
        
        {videoFile ? (
          <p className="text-green-600 mb-4 font-semibold">
            Selected: {videoFile.name}
          </p>
        ) : (
          <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-blue-700">
            Drag and drop your video file here
          </p>
        )}

        <input 
          type="file" 
          id="video-upload" 
          accept="video/*" 
          className="hidden" 
          onChange={handleFileChange} 
        />
        
        {/* BUTTON CONTAINER */}
        <div className="flex gap-4 mt-2 items-center justify-center">
          
          {/* RESTORED: Your original blue styling for the Browse button */}
          <label 
            htmlFor="video-upload" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg cursor-pointer"
          >
            {videoFile ? "Change File" : "Browse Files"}
          </label>

          {/* NEW: Green styling for the Upload button so it stands out next to the blue */}
          {videoFile && uploadStatus === 'idle' && (
            <button 
              onClick={handleUpload}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg"
            >
              Upload to Server
            </button>
          )}
        </div>

        {/* Dynamic Loading Messages */}
        {uploadStatus === 'uploading' && (
          <div className="mt-6 text-blue-600 font-semibold animate-pulse">
            Uploading to server... 
          </div>
        )}
        
        {uploadStatus === 'processing' && (
          <div className="mt-6 text-orange-500 font-semibold animate-pulse">
            Processing video (Extracting audio)...
          </div>
        )}

        {uploadStatus === 'success' && (
          <div className="mt-6 text-green-600 font-bold">
            ✓ Upload and processing complete!
          </div>
        )}
        
      </div>
    </div>
  );
}