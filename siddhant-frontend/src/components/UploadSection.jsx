// export default function UploadSection() {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 text-center">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload a Video</h2>
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 flex flex-col items-center justify-center">
//         <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//         </svg>
//         <p className="text-gray-500 mb-4">Drag and drop your video file here, or click to browse</p>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-200">
//           Select Video
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function UploadSection() {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 text-center">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload a Video</h2>
      
//       {/* Notice the 'group' class added here */}
//       <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-inner cursor-pointer group">
        
//         {/* Notice 'group-hover:scale-110' and 'group-hover:text-blue-500' */}
//         <svg className="w-16 h-16 text-gray-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path> {/* Added a little extra arrow detail to the SVG */}
//         </svg>
        
//         <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-blue-700">Drag and drop your video file here</p>
        
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg pointer-events-none">
//           Browse Files
//         </button>
//       </div>
//     </div>
//   );
// }

export default function UploadSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 text-center">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload a Video</h2>
      
      {/* 1. cursor-pointer removed from this div */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50 flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-inner group">
        
        <svg className="w-16 h-16 text-gray-400 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10l-3 3m0 0l3 3m-3-3h12"></path>
        </svg>
        
        <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-blue-700">Drag and drop your video file here</p>
        
        {/* 2. pointer-events-none removed, and cursor-pointer added explicitly here */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-200 active:scale-95 shadow hover:shadow-lg cursor-pointer">
          Browse Files
        </button>
      </div>
    </div>
  );
}