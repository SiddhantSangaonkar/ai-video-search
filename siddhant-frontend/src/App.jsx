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
  const [videoId, setVideoId] = useState(null);

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
      const response = await VideoAPI.searchVideo(videoId, query);
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
      // CHANGED: We now catch the ID and save it into your App state bucket before switching pages!
      onUploadSuccess={(newVideoId) => {
        setVideoId(newVideoId);
        setCurrentView('search');
      }} 
    />

  </div>
)}

      {/* PAGE 3: SEARCH DASHBOARD (Integrated View) */}
      {currentView === 'search' && (
        <div className="max-w-6xl mx-auto pt-10 px-4">

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
          <div className="mb-12 min-h-37.5">
            {isSearching && <p className="text-center text-blue-400 tracking-widest animate-pulse font-light">SCANNING NEURAL TRANSCRIPT...</p>}

            {searchError && (
              <div className="flex flex-col items-center justify-center p-8 border border-red-500/20 bg-red-500/5 rounded-xl backdrop-blur-sm">
                <svg className="w-12 h-12 text-red-500 mb-3 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-red-400 font-bold tracking-widest text-center">{searchError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* CHANGED: Added 'index' to use as the key since 'id' is gone */}
              {searchResults.map((result, index) => (
                <ResultCard 
                  key={index} 
                  text={result.snippet}           
                  startTime={result.timestamp}    
                  endTime={result.end_time}       
                  score={result.confidence}       
                  onClick={() => handleJumpToTime(result.timestamp)} 
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