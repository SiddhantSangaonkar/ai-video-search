// export default function ResultCard() {
//   return (
//     // <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition duration-200 cursor-pointer flex gap-4">
//     <div className="bg-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 cursor-pointer flex gap-4 group">
//       <div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded h-fit text-sm">
//         02:14
//       </div>
//       <div>
//         <p className="text-gray-700 text-sm">"...so we start the first DFS traversal to push the visited nodes onto the stack before moving on..."</p>
//         <p className="text-xs text-gray-400 mt-2">Confidence: 98%</p>
//       </div>
//     </div>
//   );
// }

// export default function ResultCard({ text, timestamp }) {
//   return (
//     <div className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer group">
//       <div className="flex justify-between items-start mb-2">
//         <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
//           {timestamp}
//         </span>
//         <span className="text-xs text-gray-400 group-hover:text-blue-500 font-medium">
//           Click to play
//         </span>
//       </div>
//       <p className="text-gray-700 text-sm">"...{text}..."</p>
//     </div>
//   );
// }

// // 1. Add onClick to the props
// export default function ResultCard({ text, timestamp, onClick }) {
//   return (
//     // 2. Add the onClick event to the main wrapper div
//     <div 
//       onClick={onClick}
//       className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer group hover:border-blue-300"
//     >
//       <div className="flex justify-between items-start mb-2">
//         <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
//           {timestamp}
//         </span>
//         <span className="text-xs text-gray-400 group-hover:text-blue-500 font-medium transition-colors">
//           ▶ Click to play
//         </span>
//       </div>
//       <p className="text-gray-700 text-sm">"...{text}..."</p>
//     </div>
//   );
// }

// export default function ResultCard({ text, timestamp, onClick }) {
//   return (
//     <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 hover:border-blue-500/50 p-5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group flex flex-col justify-between">
//       <div>
//         <div className="text-3xl font-light text-blue-400 mb-3 tracking-widest font-mono">
//           {timestamp}
//         </div>
//         <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
//           "{text}"
//         </p>
//       </div>
//       <button 
//         onClick={onClick}
//         className="w-full py-2 border border-blue-500/30 text-blue-400 rounded-lg tracking-widest text-xs font-semibold uppercase hover:bg-blue-500/10 transition-colors"
//       >
//         Jump to moment
//       </button>
//     </div>
//   );
// }

export default function ResultCard({ text, startTime, endTime, score, onClick }) {
  
  // Helper function to turn raw seconds (75.0) into clock time (01:15)
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    // padStart ensures it always shows two digits (e.g., 05 instead of 5)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 hover:border-blue-500/50 p-5 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="text-2xl font-light text-blue-400 tracking-widest font-mono">
            {formatTime(startTime)} - {formatTime(endTime)}
          </div>
          
          {/* A cool UI bonus: showing Rupender's AI confidence score */}
          <span className="text-[10px] tracking-widest uppercase text-slate-400 border border-slate-600 px-2 py-1 rounded">
            Score: {score.toFixed(2)}
          </span>
        </div>
        
        <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
          "{text}"
        </p>
      </div>
      
      <button 
        onClick={onClick}
        className="w-full py-2 border border-blue-500/30 text-blue-400 rounded-lg tracking-widest text-xs font-semibold uppercase hover:bg-blue-500/10 transition-colors"
      >
        Jump to {formatTime(startTime)}
      </button>
    </div>
  );
}