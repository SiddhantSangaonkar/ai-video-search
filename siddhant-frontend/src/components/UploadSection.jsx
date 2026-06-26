import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { VideoAPI } from "../api/client"; 

export default function UploadSection({ onVideoSelect, onUploadSuccess }) {
  // ─── VISUAL & ENGINE STATE ───
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); 
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  // ─── FILE HANDLING ───
  const handleFile = (file) => {
    if (file?.type.startsWith("video/")) {
      setVideoFile(file);
      setUploadStatus('idle');
      setUploadProgress(0);
      setStatusMessage('');
      if (onVideoSelect) onVideoSelect(file);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, [onVideoSelect]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleClearFile = (e) => {
    e.stopPropagation();
    setVideoFile(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setStatusMessage('');
    if (inputRef.current) inputRef.current.value = "";
  };

  const triggerFileInput = (e) => {
    e.stopPropagation();
    if (uploadStatus === 'idle' && !videoFile) {
      inputRef.current?.click();
    }
  };

  // ─── API & POLLING LOGIC ───
  const pollServerStatus = async (videoId) => {
    try {
      const response = await VideoAPI.checkVideoStatus(videoId);
      if (response.data.status === 'ready') {
        setUploadStatus('success');
        setTimeout(() => onUploadSuccess(videoId), 1500);
      } else if (response.data.status === 'failed') {
        setUploadStatus('error');
        setStatusMessage('AI PROCESSING FAILED. (ERR_500)');
      } else {
        setStatusMessage('AI EXTRACTING TRANSCRIPT... PLEASE WAIT.');
        setTimeout(() => pollServerStatus(videoId), 5000);
      }
    } catch (error) {
      setTimeout(() => pollServerStatus(videoId), 5000);
    }
  };

  const handleUpload = async (e) => {
    if (e) e.stopPropagation(); 
    if (!videoFile) return;
    
    setUploadStatus('uploading');
    setUploadProgress(0);
    
    try {
      const response = await VideoAPI.uploadVideo(videoFile, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
        if (percentCompleted === 100) {
          setUploadStatus('processing');
          setStatusMessage('FILE SECURED. INITIALIZING AI...');
        }
      });
      if (response.data && response.data.video_id) {
        pollServerStatus(response.data.video_id);
      }
    } catch (error) {
      setUploadStatus('error');
      setStatusMessage('NETWORK UPLOAD INTERRUPTED. (ERR_004)');
    }
  };

  // ─── ANIMATION VARIANTS ───
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[75vh] px-4 md:px-8 relative z-10 py-12">
      
      {/* ─── MASSIVE RADIANT BACKGROUND GLOW ─── */}
      {/* Uses native inline filters so Tailwind doesn't accidentally purge the blur */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[500px] rounded-[100%] bg-blue-400/20 dark:bg-cyan-500/20 transition-colors duration-700"
          style={{ filter: "blur(110px)" }}
        />
      </div>

      {/* ─── MAIN UPLOAD CARD ─── */}
      {/* Replaced ALL JS logic with strict dark: Tailwind classes */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative w-full max-w-[800px] border backdrop-blur-2xl rounded-[32px] p-12 md:p-16 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] ${
          dragging 
            ? "bg-blue-50/90 dark:bg-slate-800/90 border-blue-500/60 dark:border-cyan-500/60" 
            : "bg-white/80 dark:bg-[#0B1121]/80 border-slate-200/80 dark:border-slate-700/60"
        }`}
      >
        <div className="flex flex-col items-center text-center gap-8 relative z-10">
          
          {/* HEADER */}
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-black tracking-[0.2em] uppercase transition-colors duration-500 text-slate-900 dark:text-white"
          >
            Video Upload
          </motion.h2>
          
          {/* GLOWING DROP CIRCLE */}
          <motion.div variants={itemVariants} className="relative w-[140px] h-[140px] flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="66" strokeWidth="1.5" strokeDasharray="8 6" className="stroke-blue-500 dark:stroke-cyan-500 animate-[spinSlow_20s_linear_infinite] transition-colors duration-500" />
              <circle cx="70" cy="70" r="54" strokeWidth="1" strokeDasharray="4 8" className="stroke-blue-400/40 dark:stroke-cyan-400/40 animate-[spinSlow_14s_linear_infinite_reverse] transition-colors duration-500" />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              {uploadStatus === 'idle' && !videoFile ? (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="stroke-blue-600 dark:stroke-cyan-300 transition-colors duration-500">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              ) : (
                <span className="text-2xl font-bold font-mono text-blue-600 dark:text-cyan-300 transition-colors duration-500">
                  {uploadStatus === 'idle' || uploadStatus === 'error' ? "READY" : `${uploadProgress}%`}
                </span>
              )}
            </div>
            
            {/* Inner Circle Glow */}
            <div className="absolute inset-5 rounded-full animate-[glowPulse_3s_ease-in-out_infinite] bg-blue-500/10 dark:bg-cyan-500/20 transition-colors duration-500" style={{ filter: "blur(12px)" }} />
          </motion.div>

          <motion.div variants={itemVariants} className="w-full flex flex-col items-center">
            
            {/* STATE 1: WAITING FOR FILE */}
            {!videoFile && (
              <>
                <p className="text-lg font-bold tracking-[0.05em] uppercase transition-colors duration-500 text-slate-900 dark:text-white">
                  {dragging ? "RELEASE TO SECURE FILE" : "DRAG AND DROP YOUR VIDEO FILE"}
                </p>
                
                <div className="flex items-center w-full max-w-[280px] mx-auto my-6 text-slate-500 dark:text-slate-400 transition-colors duration-500">
                  <div className="flex-1 h-[1px] bg-current opacity-30"></div>
                  <span className="px-5 text-sm font-bold tracking-[0.15em] uppercase opacity-80">OR</span>
                  <div className="flex-1 h-[1px] bg-current opacity-30"></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerFileInput}
                  className="px-8 py-3 rounded-full text-sm font-bold tracking-[0.1em] cursor-pointer transition-colors duration-300 border bg-black/5 border-black/10 hover:bg-black/10 text-slate-900 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:text-white"
                >
                  BROWSE FILES
                </motion.button>
              </>
            )}

            {/* STATE 2: FILE LOADED, WAITING TO UPLOAD */}
            {uploadStatus === 'idle' && videoFile && (
              <>
                <p className="text-lg font-bold transition-colors duration-500 mb-4 text-slate-900 dark:text-white">
                  {videoFile.name}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleUpload}
                  className="px-10 py-3 rounded-full text-sm font-bold tracking-[0.1em] cursor-pointer text-white transition-shadow duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] dark:from-cyan-600 dark:to-blue-600 dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                >
                  INITIALIZE SYSTEM
                </motion.button>
              </>
            )}

            {/* STATE 3: ENGINE PROCESSING */}
            {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
               <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full mt-2 flex flex-col items-center max-w-md">
                 <p className="text-sm font-mono tracking-[0.08em] mb-4 transition-colors duration-500 text-slate-500 dark:text-slate-400">
                   {uploadStatus === 'uploading' ? "UPLOADING FILE TO CLUSTER..." : statusMessage}
                 </p>
                 <div className="w-full h-2 rounded-full overflow-hidden relative bg-slate-200 dark:bg-slate-800 transition-colors duration-500">
                    <div 
                      className="h-full transition-all duration-300 ease-out bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] dark:bg-cyan-500 dark:shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                      style={{ width: `${uploadProgress}%` }}
                    />
                 </div>
               </motion.div>
            )}

            {/* STATE 4: SUCCESS */}
            {uploadStatus === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 font-mono text-emerald-500 tracking-[0.15em] text-sm font-bold uppercase">
                SYSTEM READY. REDIRECTING...
              </motion.p>
            )}

            {/* STATE 5: ERROR HANDLING */}
            {uploadStatus === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col items-center gap-6">
                <p className="text-sm font-mono tracking-[0.08em] text-red-500 font-bold uppercase">
                  {statusMessage}
                </p>
                <div className="flex items-center gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                    className="px-8 py-3 bg-red-600 text-white font-bold tracking-widest text-xs rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] cursor-pointer"
                  >
                    RETRY UPLOAD
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={handleClearFile}
                    className="px-8 py-3 border font-bold tracking-widest text-xs rounded-full cursor-pointer transition-colors duration-300 border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    CHANGE FILE
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
        
        {/* Hidden File Input */}
        <input ref={inputRef} type="file" accept="video/*" onChange={handleChange} className="hidden" />
      </motion.div>

      {/* ─── DEV BYPASS BUTTON ─── */}
      {/* <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        onClick={() => onUploadSuccess('dev-bypass-id')}
        className="mt-12 text-xs font-mono tracking-[0.2em] transition-colors uppercase relative group cursor-pointer text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-cyan-400"
      >
        Dev Bypass: Skip to Search Dashboard
        <span className="absolute -bottom-2 left-0 right-0 h-px bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
      </motion.button> */}

      {/* Required Keyframes */}
      <style>{`
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
      `}</style>
    </div>
  );
}