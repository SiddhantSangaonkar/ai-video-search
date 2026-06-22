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