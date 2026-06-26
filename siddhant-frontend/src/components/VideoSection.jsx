import { useState } from 'react';

export default function VideoSection({ videoRef, currentVideoSrc }) {
  // 1. Memory to store the video's exact shape (defaults to standard 16:9)
  const [videoRatio, setVideoRatio] = useState('16 / 9');

  // 2. The magic trigger: When the video file loads, extract its actual width and height
  const handleMetadata = (e) => {
    const { videoWidth, videoHeight } = e.target;
    if (videoWidth && videoHeight) {
      setVideoRatio(`${videoWidth} / ${videoHeight}`);
    }
  };

  return (
    /* The outer container acts as the boundaries of the top split-pane */
    <div className="w-full h-full flex items-center justify-center p-2">
      
      {/* THE GLASS HUGGER: 
          - max-w-full & max-h-full ensure it never breaks out of the split-pane.
          - style={{ aspectRatio }} forces the box to perfectly match the video shape! 
      */}
      <div 
        style={{ aspectRatio: videoRatio }}
        className="relative max-w-full max-h-full bg-slate-900/80 backdrop-blur-md border border-slate-300 dark:border-slate-700/50 p-2 rounded-2xl shadow-xl dark:shadow-2xl flex items-center justify-center transition-colors duration-500"
      >
        {/* Background subtle glow */}
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl pointer-events-none rounded-2xl"></div>

        <video 
          ref={videoRef}
          controls
          onLoadedMetadata={handleMetadata}
          /* Changed to object-cover since the parent is now perfectly enforcing the exact ratio */
          className="w-full h-full object-cover rounded-xl z-10 bg-black/20"
          src={currentVideoSrc} 
        />
      </div>
      
    </div>
  );
}