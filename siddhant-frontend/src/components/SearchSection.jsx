// export default function SearchSection() {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Search the Transcript</h2>
//       <div className="flex gap-4">
//         <input 
//           type="text" 
//           placeholder="e.g., 'the part where we traverse the graph using DFS...'" 
//           className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />
//         {/* <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded transition duration-200">
//           Search
//         </button> */}
//         <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg">
//           Search
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useState } from 'react';

// // Notice we added props here so App.jsx can control it
// export default function SearchSection({ onSearch, isSearching }) {
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!searchQuery.trim()) return; 
    
//     // Instead of alerting, we send the text up to App.jsx!
//     onSearch(searchQuery); 
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Search Video Content</h2>
      
//       <form onSubmit={handleSearch} className="flex gap-4">
//         <input 
//           type="text" 
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="e.g., 'When did they discuss the quarterly budget?'"
//           className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
//           disabled={isSearching} 
//         />
        
//         <button 
//           type="submit"
//           disabled={isSearching || !searchQuery.trim()}
//           className={`px-8 py-3 rounded-lg font-bold text-white transition-all shadow ${
//             isSearching || !searchQuery.trim() 
//               ? 'bg-blue-400 cursor-not-allowed' 
//               : 'bg-blue-600 hover:bg-blue-700 active:scale-95 hover:shadow-lg'
//           }`}
//         >
//           {isSearching ? 'Searching...' : 'Search AI'}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';

export default function SearchSection({ onSearch, isSearching }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25"></div>
      <div className="relative flex items-center bg-slate-900 border border-slate-700/50 rounded-full px-6 py-4 shadow-2xl">
        <svg className="w-6 h-6 text-blue-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search inside the video transcript..." 
          className="flex-1 bg-transparent outline-none text-slate-200 placeholder-slate-500 font-light tracking-wide text-lg"
          disabled={isSearching}
        />
        <button type="submit" disabled={isSearching} className="hidden"></button>
      </div>
    </form>
  );
}