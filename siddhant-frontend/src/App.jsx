// import UploadSection from './components/UploadSection';
// import SearchSection from './components/SearchSection';
// import ResultCard from './components/ResultCard';
// import VideoSection from './components/VideoSection';

// export default function App() {
//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-10 font-sans">
      
//       {/* HEADER */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">AI Video Search Engine</h1>
//         <p className="text-gray-600 text-lg">Search inside your videos using natural language.</p>
//       </div>

//       {/* COMPONENTS */}
//       <UploadSection />
//       <SearchSection />

//       {/* RESULTS GRID */}
//       <div className="mb-10">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800">Search Results</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <ResultCard />
//           <ResultCard />
//           <ResultCard />
//         </div>
//       </div>

//       {/* VIDEO PLAYER SECTION */}
//       <VideoSection />

//     </div>
//   );
// }

// import { useState } from 'react'; // Added this import
// import UploadSection from './components/UploadSection';
// import SearchSection from './components/SearchSection';
// import ResultCard from './components/ResultCard';
// import VideoSection from './components/VideoSection';

// export default function App() {
//   // Master State for the Search Engine
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);

//   // The Mock Search Function
//   const executeSearch = (query) => {
//     setIsSearching(true);
//     setSearchResults([]); // Clear old results

//     // Simulate waiting for Rupender's AI to scan the video
//     setTimeout(() => {
//       // Fake data that we will eventually get from the backend
//       setSearchResults([
//         { id: 1, text: "We need to allocate $50,000 for the Q3 budget.", timestamp: "01:24" },
//         { id: 2, text: "The marketing budget was approved yesterday.", timestamp: "04:12" }
//       ]);
//       setIsSearching(false);
//     }, 1500);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-10 font-sans">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">AI Video Search Engine</h1>
//         <p className="text-gray-600 text-lg">Search inside your videos using natural language.</p>
//       </div>

//       <UploadSection />
      
//       {/* We pass the function and the loading state down as props */}
//       <SearchSection onSearch={executeSearch} isSearching={isSearching} />

//       {/* RESULTS GRID */}
//       <div className="mb-10">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800">
//           {isSearching ? "Scanning transcript..." : searchResults.length > 0 ? "Search Results" : ""}
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* We "map" over the array to generate a card for every result */}
//           {searchResults.map((result) => (
//             <ResultCard 
//               key={result.id} 
//               text={result.text} 
//               timestamp={result.timestamp} 
//             />
//           ))}
//         </div>
//       </div>

//       <VideoSection />
//     </div>
//   );
// }

// import { useState, useRef } from 'react'; // 1. Import useRef
// import UploadSection from './components/UploadSection';
// import SearchSection from './components/SearchSection';
// import ResultCard from './components/ResultCard';
// import VideoSection from './components/VideoSection';

// export default function App() {
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
  
//   // 2. Create the remote control for the video player
//   const playerRef = useRef(null);

//   const executeSearch = (query) => {
//     setIsSearching(true);
//     setSearchResults([]); 

//     setTimeout(() => {
//       setSearchResults([
//         { id: 1, text: "We need to allocate $50,000 for the Q3 budget.", timestamp: "00:03" }, // Changed to 3 seconds for our short test video
//         { id: 2, text: "The marketing budget was approved yesterday.", timestamp: "00:08" }  // Changed to 8 seconds
//       ]);
//       setIsSearching(false);
//     }, 1500);
//   };

//   // 3. The function that runs when a card is clicked
//   const handleJumpToTime = (timestamp) => {
//     // Convert "MM:SS" into total seconds (e.g., "01:20" -> 80)
//     const [minutes, seconds] = timestamp.split(':').map(Number);
//     const totalSeconds = (minutes * 60) + seconds;
    
//     // If our remote control is connected, tell the player to jump!
//     if (playerRef.current) {
//       playerRef.current.seekTo(totalSeconds, 'seconds');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-10 font-sans">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">AI Video Search Engine</h1>
//         <p className="text-gray-600 text-lg">Search inside your videos using natural language.</p>
//       </div>

//       <UploadSection />
      
//       <SearchSection onSearch={executeSearch} isSearching={isSearching} />

//       <div className="mb-10">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800">
//           {isSearching ? "Scanning transcript..." : searchResults.length > 0 ? "Search Results" : ""}
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {searchResults.map((result) => (
//             <ResultCard 
//               key={result.id} 
//               text={result.text} 
//               timestamp={result.timestamp} 
//               // 4. Pass the click function to the card
//               onClick={() => handleJumpToTime(result.timestamp)} 
//             />
//           ))}
//         </div>
//       </div>

//       {/* 5. Hand the remote control down to the VideoSection */}
//       <VideoSection videoRef={playerRef} />
//     </div>
//   );
// }

import { useState, useRef } from 'react'; 
import UploadSection from './components/UploadSection';
import SearchSection from './components/SearchSection';
import ResultCard from './components/ResultCard';
import VideoSection from './components/VideoSection';

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Create the remote control for the native video player
  const playerRef = useRef(null);

  const executeSearch = (query) => {
    setIsSearching(true);
    setSearchResults([]); 

    setTimeout(() => {
      setSearchResults([
        { id: 1, text: "We need to allocate $50,000 for the Q3 budget.", timestamp: "00:03" }, 
        { id: 2, text: "The marketing budget was approved yesterday.", timestamp: "00:08" }  
      ]);
      setIsSearching(false);
    }, 1500);
  };

  // The function that runs when a card is clicked
  const handleJumpToTime = (timestamp) => {
    // Convert "MM:SS" into total seconds (e.g., "01:20" -> 80)
    const [minutes, seconds] = timestamp.split(':').map(Number);
    const totalSeconds = (minutes * 60) + seconds;
    
    // If our remote control is connected, tell the native player to jump!
    if (playerRef.current) {
      playerRef.current.currentTime = totalSeconds; // Native HTML5 jump command
      playerRef.current.play(); // Auto-play after jumping
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">AI Video Search Engine</h1>
        <p className="text-gray-600 text-lg">Search inside your videos using natural language.</p>
      </div>

      <UploadSection />
      
      <SearchSection onSearch={executeSearch} isSearching={isSearching} />

      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          {isSearching ? "Scanning transcript..." : searchResults.length > 0 ? "Search Results" : ""}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchResults.map((result) => (
            <ResultCard 
              key={result.id} 
              text={result.text} 
              timestamp={result.timestamp} 
              onClick={() => handleJumpToTime(result.timestamp)} 
            />
          ))}
        </div>
      </div>

      {/* Hand the remote control down to the VideoSection */}
      <VideoSection videoRef={playerRef} />
    </div>
  );
}