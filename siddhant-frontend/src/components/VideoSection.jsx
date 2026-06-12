// import ReactPlayer from 'react-player';

// export default function VideoSection() {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
//       <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
//         <ReactPlayer 
//         //   url="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//           url="https://www.w3schools.com/html/mov_bbb.mp4" 
//           controls={true}
//           width="100%"
//           height="100%"
//         />
//       </div>
//     </div>
//   );
// }

// import ReactPlayer from 'react-player';

// // 1. Accept the videoRef prop from App.jsx
// export default function VideoSection({ videoRef }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
//       <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
//         <ReactPlayer 
//           ref={videoRef} // 2. Attach the remote control right here!
//           url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
//           controls={true}
//           width="100%"
//           height="100%"
//         />
//       </div>
//     </div>
//   );
// }

// import ReactPlayer from 'react-player';

// export default function VideoSection({ videoRef }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
//       <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
        
//         <ReactPlayer 
//           ref={videoRef} 
//           url="/test-video.mp4" 
//           controls={true}
//           width="100%"
//           height="100%"
//         />
        
//       </div>
//     </div>
//   );
// }

// import ReactPlayer from 'react-player';
// import myTestVideo from '../assets/test-video.mp4'; 

// export default function VideoSection({ videoRef }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
//       <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
        
//         <ReactPlayer 
//           ref={videoRef} 
//           url={myTestVideo} 
//           controls={true}
//           width="100%"
//           height="100%"
//         />
        
//       </div>
//     </div>
//   );
// }

// import ReactPlayer from 'react-player';

// export default function VideoSection({ videoRef }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
//       <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
        
//         <ReactPlayer 
//           ref={videoRef} 
//           url="https://vimeo.com/1084537" // A universally unblocked dummy video
//           controls={true}
//           width="100%"
//           height="100%"
//         />
        
//       </div>
//     </div>
//   );
// }

// import ReactPlayer from 'react-player';

// export default function VideoSection({ videoRef }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
//       <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
//         <ReactPlayer 
//           ref={videoRef} 
//           url="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4"
//           controls={true}
//           width="100%"
//           height="100%"
//         />
//       </div>
//     </div>
//   );
// }

// export default function VideoSection({ videoRef }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
//       <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
        
//         {/* We are using the native browser video tag now */}
//         <video 
//           ref={videoRef}
//           controls
//           className="w-full h-full object-cover"
//           src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
//         />

//       </div>
//     </div>
//   );
// }

// export default function VideoSection({ videoRef }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
//       <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
        
//         <video 
//           ref={videoRef}
//           controls
//           className="w-full h-full object-cover"
//           src="/test.mp4" // Make sure this perfectly matches the file in your public folder!
//         />

//       </div>
//     </div>
//   );
// }

// // 1. Accept the new dynamic URL prop
// export default function VideoSection({ videoRef, currentVideoSrc }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
//       <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
        
//         {/* 2. Plug the dynamic URL into the src attribute */}
//         <video 
//           ref={videoRef}
//           controls
//           className="w-full h-full object-cover"
//           src={currentVideoSrc} 
//         />

//       </div>
//     </div>
//   );
// }

export default function VideoSection({ videoRef, currentVideoSrc }) {
  return (
    <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-2 rounded-2xl shadow-2xl z-10">
      <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
        <video 
          ref={videoRef}
          controls
          className="w-full h-full object-cover"
          src={currentVideoSrc} 
        />
      </div>
    </div>
  );
}