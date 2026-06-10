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

import { useState } from 'react';

// Notice we added props here so App.jsx can control it
export default function SearchSection({ onSearch, isSearching }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; 
    
    // Instead of alerting, we send the text up to App.jsx!
    onSearch(searchQuery); 
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Search Video Content</h2>
      
      <form onSubmit={handleSearch} className="flex gap-4">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g., 'When did they discuss the quarterly budget?'"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          disabled={isSearching} 
        />
        
        <button 
          type="submit"
          disabled={isSearching || !searchQuery.trim()}
          className={`px-8 py-3 rounded-lg font-bold text-white transition-all shadow ${
            isSearching || !searchQuery.trim() 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95 hover:shadow-lg'
          }`}
        >
          {isSearching ? 'Searching...' : 'Search AI'}
        </button>
      </form>
    </div>
  );
}