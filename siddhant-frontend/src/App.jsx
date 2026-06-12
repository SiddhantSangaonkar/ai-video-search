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

// import { useState, useRef } from 'react'; 
// import UploadSection from './components/UploadSection';
// import SearchSection from './components/SearchSection';
// import ResultCard from './components/ResultCard';
// import VideoSection from './components/VideoSection';

// export default function App() {
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);

//   // Create the remote control for the native video player
//   const playerRef = useRef(null);

//   const executeSearch = (query) => {
//     setIsSearching(true);
//     setSearchResults([]); 

//     setTimeout(() => {
//       setSearchResults([
//         { id: 1, text: "We need to allocate $50,000 for the Q3 budget.", timestamp: "00:03" }, 
//         { id: 2, text: "The marketing budget was approved yesterday.", timestamp: "00:08" }  
//       ]);
//       setIsSearching(false);
//     }, 1500);
//   };

//   // The function that runs when a card is clicked
//   const handleJumpToTime = (timestamp) => {
//     // Convert "MM:SS" into total seconds (e.g., "01:20" -> 80)
//     const [minutes, seconds] = timestamp.split(':').map(Number);
//     const totalSeconds = (minutes * 60) + seconds;

//     // If our remote control is connected, tell the native player to jump!
//     if (playerRef.current) {
//       playerRef.current.currentTime = totalSeconds; // Native HTML5 jump command
//       playerRef.current.play(); // Auto-play after jumping
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
//               onClick={() => handleJumpToTime(result.timestamp)} 
//             />
//           ))}
//         </div>
//       </div>

//       {/* Hand the remote control down to the VideoSection */}
//       <VideoSection videoRef={playerRef} />
//     </div>
//   );
// }

// import { useState, useRef } from 'react'; 
// import UploadSection from './components/UploadSection';
// import SearchSection from './components/SearchSection';
// import ResultCard from './components/ResultCard';
// import VideoSection from './components/VideoSection';

// export default function App() {
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);

//   // 1. Add this new state! It defaults to your local test video.
//   const [videoSrc, setVideoSrc] = useState("/test.mp4"); 

//   const playerRef = useRef(null);

//   // 2. Add this function. It takes the uploaded file and turns it into a playable URL.
//   const handleVideoSelected = (file) => {
//     const localUrl = URL.createObjectURL(file);
//     setVideoSrc(localUrl);
//   };

//   const executeSearch = (query) => {
//     setIsSearching(true);
//     setSearchResults([]); 

//     setTimeout(() => {
//       setSearchResults([
//         { id: 1, text: "We need to allocate $50,000 for the Q3 budget.", timestamp: "00:03" }, 
//         { id: 2, text: "The marketing budget was approved yesterday.", timestamp: "00:08" }  
//       ]);
//       setIsSearching(false);
//     }, 1500);
//   };

//   const handleJumpToTime = (timestamp) => {
//     const [minutes, seconds] = timestamp.split(':').map(Number);
//     const totalSeconds = (minutes * 60) + seconds;

//     if (playerRef.current) {
//       playerRef.current.currentTime = totalSeconds; 
//       playerRef.current.play(); 
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-10 font-sans">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">AI Video Search Engine</h1>
//         <p className="text-gray-600 text-lg">Search inside your videos using natural language.</p>
//       </div>

//       {/* 3. Pass the new handler to the Upload Section */}
//       <UploadSection onVideoSelect={handleVideoSelected} />

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
//               onClick={() => handleJumpToTime(result.timestamp)} 
//             />
//           ))}
//         </div>
//       </div>

//       {/* 4. Pass the active URL down to the Video Section */}
//       <VideoSection videoRef={playerRef} currentVideoSrc={videoSrc} />
//     </div>
//   );
// }

// import { useState, useRef } from 'react'; 
// import UploadSection from './components/UploadSection';
// import SearchSection from './components/SearchSection';
// import ResultCard from './components/ResultCard';
// import VideoSection from './components/VideoSection';

// // 1. Import your API client
// import { VideoAPI } from './api/client'; 

// export default function App() {
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);

//   // 2. Add a new state to handle AI failures gracefully
//   const [searchError, setSearchError] = useState(null); 

//   const [videoSrc, setVideoSrc] = useState("/test.mp4"); 
//   const playerRef = useRef(null);

//   const handleVideoSelected = (file) => {
//     const localUrl = URL.createObjectURL(file);
//     setVideoSrc(localUrl);
//   };

//   // 3. The Real AI Search Logic
//   const executeSearch = async (query) => {
//     if (!query.trim()) return; // Prevent empty searches

//     // Reset the UI before searching
//     setIsSearching(true);
//     setSearchResults([]); 
//     setSearchError(null);

//     try {
//       // Fire the text query to Rupender's endpoint
//       const response = await VideoAPI.searchVideo(query);

//       // Check if the AI actually found any matches in the transcript
//       if (response.data && response.data.results && response.data.results.length > 0) {
//         // AI success! Load the real timestamps into React memory.
//         setSearchResults(response.data.results);
//       } else {
//         // AI worked, but found no matches
//         setSearchError("No matches found in the video for that phrase.");
//       }

//     } catch (error) {
//       // Rupender's server crashed or the network failed
//       console.error("Search failed:", error);
//       setSearchError("Failed to connect to the AI search engine. Is the backend running?");
//     } finally {
//       // Always turn off the spinning loader, whether it succeeded or failed
//       setIsSearching(false);
//     }
//   };

//   const handleJumpToTime = (timestamp) => {
//     const [minutes, seconds] = timestamp.split(':').map(Number);
//     const totalSeconds = (minutes * 60) + seconds;

//     if (playerRef.current) {
//       playerRef.current.currentTime = totalSeconds; 
//       playerRef.current.play(); 
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-10 font-sans">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-extrabold text-gray-900 mb-2">AI Video Search Engine</h1>
//         <p className="text-gray-600 text-lg">Search inside your videos using natural language.</p>
//       </div>

//       <UploadSection onVideoSelect={handleVideoSelected} />

//       <SearchSection onSearch={executeSearch} isSearching={isSearching} />

//       <div className="mb-10">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800">
//           {isSearching ? "Scanning AI transcript..." : searchResults.length > 0 ? "Search Results" : ""}
//         </h3>

//         {/* 4. The New Defensive UI for Search Errors */}
//         {searchError && (
//           <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 text-center font-medium">
//             ❌ {searchError}
//           </div>
//         )}

//         {/* The Result Cards (Now driven by real AI data) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {searchResults.map((result) => (
//             <ResultCard 
//               key={result.id} 
//               text={result.text} 
//               timestamp={result.timestamp} 
//               onClick={() => handleJumpToTime(result.timestamp)} 
//             />
//           ))}
//         </div>
//       </div>

//       <VideoSection videoRef={playerRef} currentVideoSrc={videoSrc} />
//     </div>
//   );
// }

// import { useState, useRef } from 'react'; 
// import IntroPage from './components/IntroPage';
// import UploadSection from './components/UploadSection';
// import SearchSection from './components/SearchSection';
// import ResultCard from './components/ResultCard';
// import VideoSection from './components/VideoSection';
// import { VideoAPI } from './api/client'; 

// export default function App() {
//   // Navigation State
//   const [currentView, setCurrentView] = useState('intro'); // 'intro' | 'upload' | 'search'

//   // Engine State
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [searchError, setSearchError] = useState(null); 
//   const [videoSrc, setVideoSrc] = useState(null); 
//   const playerRef = useRef(null);

//   const handleVideoSelected = (file) => {
//     const localUrl = URL.createObjectURL(file);
//     setVideoSrc(localUrl);
//   };

//   const executeSearch = async (query) => {
//     if (!query.trim()) return;
//     setIsSearching(true);
//     setSearchResults([]); 
//     setSearchError(null);

//     try {
//       const response = await VideoAPI.searchVideo(query);
//       if (response.data && response.data.results && response.data.results.length > 0) {
//         setSearchResults(response.data.results);
//       } else {
//         setSearchError("NO MATCHES FOUND IN TRANSCRIPT.");
//       }
//     } catch (error) {
//       console.error("Search failed:", error);
//       // THE NEW SPECIFIC AI ERROR TEXT
//       setSearchError("AI CONNECTION ERROR: TEMPORARY SERVER FAILURE. TRY AGAIN LATER.");
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleJumpToTime = (timestamp) => {
//     const [minutes, seconds] = timestamp.split(':').map(Number);
//     const totalSeconds = (minutes * 60) + seconds;
//     if (playerRef.current) {
//       playerRef.current.currentTime = totalSeconds; 
//       playerRef.current.play(); 
//     }
//   };

//   // The Main Router Render
//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 pb-20">

//       {/* PAGE 1: INTRO */}
//       {currentView === 'intro' && (
//         <IntroPage onStart={() => setCurrentView('upload')} />
//       )}

//       {/* PAGE 2: UPLOAD */}
//       {currentView === 'upload' && (
//         <div className="max-w-4xl mx-auto pt-10">
//           <button onClick={() => setCurrentView('intro')} className="text-slate-500 hover:text-blue-400 mb-4 px-4 tracking-widest text-sm transition-colors">
//             ← BACK TO SYSTEM
//           </button>
//           <UploadSection 
//             onVideoSelect={handleVideoSelected} 
//             onUploadSuccess={() => setCurrentView('search')} 
//           />
//         </div>
//       )}

//       {/* PAGE 3: SEARCH DASHBOARD (Integrated View) */}
//       {currentView === 'search' && (
//         <div className="max-w-6xl mx-auto pt-10 px-4">

//           {/* Dashboard Header/Search Area */}
//           <div className="mb-12 flex justify-center">
//              <SearchSection onSearch={executeSearch} isSearching={isSearching} />
//           </div>

//           {/* Error & Results Area */}
//           <div className="mb-12 min-h-[150px]">
//             {isSearching && <p className="text-center text-blue-400 tracking-widest animate-pulse font-light">SCANNING NEURAL TRANSCRIPT...</p>}

//             {/* The Custom AI Error State */}
//             {searchError && (
//               <div className="flex flex-col items-center justify-center p-8 border border-red-500/20 bg-red-500/5 rounded-xl backdrop-blur-sm">
//                  <svg className="w-12 h-12 text-red-500 mb-3 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                  </svg>
//                  <p className="text-red-400 font-bold tracking-widest text-center">{searchError}</p>
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {searchResults.map((result) => (
//                 <ResultCard 
//                   key={result.id} 
//                   text={result.text} 
//                   timestamp={result.timestamp} 
//                   onClick={() => handleJumpToTime(result.timestamp)} 
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Central Video Player */}
//           <div className="relative mx-auto max-w-4xl">
//              <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-3xl pointer-events-none"></div>
//              <VideoSection videoRef={playerRef} currentVideoSrc={videoSrc} />
//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

import { useState, useRef } from 'react';
import IntroPage from './components/IntroPage';
import UploadSection from './components/UploadSection';
import SearchSection from './components/SearchSection';
import ResultCard from './components/ResultCard';
import VideoSection from './components/VideoSection';
import { VideoAPI } from './api/client';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState('intro'); // 'intro' | 'upload' | 'search'

  // Engine State
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const playerRef = useRef(null);

  const handleVideoSelected = (file) => {
    const localUrl = URL.createObjectURL(file);
    setVideoSrc(localUrl);
  };

  const executeSearch = async (query) => {
    if (!query.trim()) return;
    setIsSearching(true);
    setSearchResults([]);
    setSearchError(null);

    try {
      const response = await VideoAPI.searchVideo(query);
      if (response.data && response.data.results && response.data.results.length > 0) {
        setSearchResults(response.data.results);
      } else {
        setSearchError("NO MATCHES FOUND IN TRANSCRIPT.");
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchError("AI CONNECTION ERROR: TEMPORARY SERVER FAILURE. TRY AGAIN LATER.");
    } finally {
      setIsSearching(false);
    }
  };

  // const handleJumpToTime = (timestamp) => {
  //   const [minutes, seconds] = timestamp.split(':').map(Number);
  //   const totalSeconds = (minutes * 60) + seconds;
  //   if (playerRef.current) {
  //     playerRef.current.currentTime = totalSeconds;
  //     playerRef.current.play();
  //   }
  // };

  const handleJumpToTime = (timeInSeconds) => {
    if (playerRef.current) {
      playerRef.current.currentTime = timeInSeconds; 
      playerRef.current.play(); 
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 pb-20">

      {/* PAGE 1: INTRO */}
      {currentView === 'intro' && (
        <IntroPage onStart={() => setCurrentView('upload')} />
      )}

      {/* PAGE 2: UPLOAD
      {currentView === 'upload' && (
        <div className="max-w-4xl mx-auto pt-10">
          <button onClick={() => setCurrentView('intro')} className="text-slate-500 hover:text-blue-400 mb-4 px-4 tracking-widest text-sm transition-colors">
            ← BACK TO SYSTEM
          </button>
          <UploadSection
            onVideoSelect={handleVideoSelected}
            onUploadSuccess={() => setCurrentView('search')}
          />
        </div>
      )} */}

      {/* PAGE 2: UPLOAD */}
      {currentView === 'upload' && (
        <div className="w-full pt-10 px-4">
          
          {/* This wrapper is now max-w-2xl to perfectly align with the Upload Card below it */}
          <div className="w-full max-w-2xl mx-auto flex justify-start">
            <button 
              onClick={() => setCurrentView('intro')} 
              className="text-slate-500 hover:text-blue-400 tracking-widest text-sm transition-colors flex items-center gap-2"
            >
              <span>←</span> BACK TO SYSTEM
            </button>
          </div>

          <UploadSection 
            onVideoSelect={handleVideoSelected} 
            onUploadSuccess={() => setCurrentView('search')} 
          />
          
        </div>
      )}

      {/* PAGE 3: SEARCH DASHBOARD (Integrated View) */}
      {currentView === 'search' && (
        <div className="max-w-6xl mx-auto pt-10 px-4">

          {/* --- THE NEW BACK BUTTON ---
          <div className="flex justify-start max-w-4xl mx-auto mb-4">
            <button 
              onClick={() => setCurrentView('upload')} 
              className="text-slate-500 hover:text-blue-400 px-4 tracking-widest text-sm transition-colors"
            >
              ← BACK TO UPLOAD
            </button>
          </div> */}

          {/* --- THE NEW BACK BUTTON --- */}
          <div className="w-full max-w-2xl mx-auto mb-6 flex justify-start">
            <button
              onClick={() => setCurrentView('upload')}
              className="text-slate-500 hover:text-blue-400 tracking-widest text-sm transition-colors flex items-center gap-2"
            >
              <span>←</span> BACK TO UPLOAD
            </button>
          </div>

          {/* Dashboard Header/Search Area */}
          <div className="mb-12 flex justify-center">
            <SearchSection onSearch={executeSearch} isSearching={isSearching} />
          </div>

          {/* Error & Results Area */}
          <div className="mb-12 min-h-[150px]">
            {isSearching && <p className="text-center text-blue-400 tracking-widest animate-pulse font-light">SCANNING NEURAL TRANSCRIPT...</p>}

            {searchError && (
              <div className="flex flex-col items-center justify-center p-8 border border-red-500/20 bg-red-500/5 rounded-xl backdrop-blur-sm">
                <svg className="w-12 h-12 text-red-500 mb-3 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-red-400 font-bold tracking-widest text-center">{searchError}</p>
              </div>
            )}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map((result) => (
                <ResultCard
                  key={result.id}
                  text={result.text}
                  timestamp={result.timestamp}
                  onClick={() => handleJumpToTime(result.timestamp)}
                />
              ))}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {searchResults.map((result) => (
    <ResultCard 
      key={result.id} 
      text={result.text} 
      startTime={result.start_time}
      endTime={result.end_time}
      score={result.score}
      onClick={() => handleJumpToTime(result.start_time)} 
    />
  ))}
</div>
          </div>

          {/* Central Video Player */}
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-blue-600/10 blur-3xl rounded-3xl pointer-events-none"></div>
            <VideoSection videoRef={playerRef} currentVideoSrc={videoSrc} />
          </div>

        </div>
      )}

    </div>
  );
}