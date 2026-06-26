import { useState, useRef, useEffect } from 'react';
// NEW: Import Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

import IntroPage from './components/IntroPage';
import UploadSection from './components/UploadSection';
import SearchSection from './components/SearchSection';
import ResultCard from './components/ResultCard';
import VideoSection from './components/VideoSection';
import { VideoAPI } from './api/client';

export default function App() {
  const [currentView, setCurrentView] = useState('intro'); 
  const [isDarkMode, setIsDarkMode] = useState(true); 

  // --- THEME HOOK ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- SPLIT PANE RESIZER ENGINE ---
  const [chatHeight, setChatHeight] = useState(350); 
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight > 150 && newHeight < window.innerHeight * 0.8) {
        setChatHeight(newHeight);
      }
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default'; 
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
    document.body.style.cursor = 'row-resize'; 
  };

  // --- CORE ENGINE STATE ---
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

  const handleJumpToTime = (timeInSeconds) => {
    if (playerRef.current) {
      playerRef.current.currentTime = timeInSeconds;
      playerRef.current.play();
    }
  };

  // --- ANIMATION SETTINGS ---
  // This dictates exactly how the pages slide in and fade out
  const pageVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 }, // Start slightly transparent, lower, and smaller
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }, // Slide into place
    exit: { opacity: 0, y: -15, scale: 0.98, transition: { duration: 0.3, ease: "easeIn" } } // Slide up and fade away
  };

  return (
    <div className="font-['Outfit'] min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-100 transition-colors duration-500 selection:bg-blue-500/30 overflow-hidden relative">

      {/* Persistent Theme Toggle Button */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-6 right-6 z-[60] p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg hover:scale-110 transition-transform"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* NEW: AnimatePresence wraps our page routing. mode="wait" ensures the old page fades out BEFORE the new one starts fading in. */}
      <AnimatePresence mode="wait">
        
        {/* PAGE 1: INTRO */}
        {currentView === 'intro' && (
          <motion.div 
            key="intro" 
            variants={pageVariants} initial="initial" animate="animate" exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <IntroPage onStart={() => setCurrentView('upload')} />
          </motion.div>
        )}

        {/* PAGE 2: UPLOAD */}
        {currentView === 'upload' && (
          <motion.div 
            key="upload" 
            variants={pageVariants} initial="initial" animate="animate" exit="exit"
            className="absolute inset-0 w-full h-full overflow-y-auto"
          >
            <div className="w-full pt-10 px-4 min-h-screen">
              <div className="w-full max-w-2xl mx-auto flex justify-start mb-6">
                <button
                  onClick={() => setCurrentView('intro')}
                  className="text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 tracking-widest text-sm transition-colors flex items-center gap-2 font-semibold"
                >
                  <span>←</span> BACK TO SYSTEM
                </button>
              </div>
              <UploadSection 
                onVideoSelect={handleVideoSelected}
                onUploadSuccess={(newVideoId) => {
                  setVideoId(newVideoId);
                  setCurrentView('search');
                }} 
              />
            </div>
          </motion.div>
        )}

        {/* PAGE 3: SEARCH DASHBOARD */}
        {currentView === 'search' && (
          <motion.div 
            key="search" 
            variants={pageVariants} initial="initial" animate="animate" exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <div className="fixed inset-0 flex flex-col bg-slate-50 dark:bg-[#020617] z-40 overflow-hidden">
              {/* TOP PANE: Video Area */}
              <div className="flex-1 flex flex-col min-h-0 relative p-4 pb-2">
                <div className="mb-2 mt-2 ml-4">
                  <button
                    onClick={() => setCurrentView('upload')}
                    className="text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 tracking-widest text-sm transition-colors flex items-center gap-2 font-semibold"
                  >
                    <span>←</span> NEW UPLOAD
                  </button>
                </div>
                <div className="flex-1 w-full min-h-0 flex items-center justify-center px-2 md:px-6">
                  <VideoSection videoRef={playerRef} currentVideoSrc={videoSrc} />
                </div>
              </div>

              {/* THE DRAGGABLE RESIZER */}
              <div 
                onMouseDown={handleMouseDown}
                className="h-3 w-full cursor-row-resize bg-transparent hover:bg-blue-500/20 dark:hover:bg-blue-500/30 flex-shrink-0 z-50 flex items-center justify-center transition-colors group"
              >
                <div className="w-12 h-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors"></div>
              </div>

              {/* BOTTOM PANE: Chat & Results Area */}
              <div 
                style={{ height: `${chatHeight}px` }} 
                className="flex flex-col bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex-shrink-0 transition-colors duration-500 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                  <div className="max-w-4xl mx-auto">
                    {isSearching && <p className="text-center text-blue-500 dark:text-blue-400 tracking-widest animate-pulse font-light py-4">SCANNING NEURAL TRANSCRIPT...</p>}
                    {searchError && (
                      <div className="flex flex-col items-center justify-center p-6 border border-red-500/20 bg-red-50 dark:bg-red-500/5 rounded-xl">
                        <p className="text-red-500 dark:text-red-400 font-bold tracking-widest text-center">{searchError}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map((result, index) => (
                        <ResultCard 
                          key={index} text={result.snippet} startTime={result.timestamp} endTime={result.end_time} score={result.confidence}       
                          onClick={() => handleJumpToTime(result.timestamp)} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
                  <div className="max-w-4xl mx-auto">
                    <SearchSection onSearch={executeSearch} isSearching={isSearching} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}



