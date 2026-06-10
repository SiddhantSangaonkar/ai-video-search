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

// 1. Add onClick to the props
export default function ResultCard({ text, timestamp, onClick }) {
  return (
    // 2. Add the onClick event to the main wrapper div
    <div 
      onClick={onClick}
      className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer group hover:border-blue-300"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
          {timestamp}
        </span>
        <span className="text-xs text-gray-400 group-hover:text-blue-500 font-medium transition-colors">
          ▶ Click to play
        </span>
      </div>
      <p className="text-gray-700 text-sm">"...{text}..."</p>
    </div>
  );
}