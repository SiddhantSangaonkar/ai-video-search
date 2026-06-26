export default function ResultCard({ text, startTime, endTime, score, onClick }) {
  // Helper to format raw seconds into a clean MM:SS format
  const formatTime = (timeInSeconds) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper to color-code the AI's confidence score
  const getScoreColor = (confidence) => {
    if (confidence >= 0.9) return "text-emerald-500 dark:text-emerald-400";
    if (confidence >= 0.7) return "text-amber-500 dark:text-amber-400";
    return "text-slate-400 dark:text-slate-500";
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col p-5 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Header: Timestamp & Confidence Score */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-md transition-colors">
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-400 font-mono tracking-wider">
            {formatTime(startTime)} - {formatTime(endTime)}
          </span>
        </div>
        
        {/* Dynamic Score Indicator */}
        <div className={`text-xs font-bold tracking-widest ${getScoreColor(score)}`}>
          {(score * 100).toFixed(0)}% MATCH
        </div>
      </div>

      {/* Body: The Spoken Transcript Snippet */}
      <p className="flex-1 text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic border-l-2 border-slate-200 dark:border-slate-600 pl-3">
        "{text}"
      </p>

      {/* Footer: Hidden Action Hint that appears on hover */}
      <div className="mt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs text-blue-500 dark:text-blue-400 font-semibold tracking-widest flex items-center gap-1">
          CLICK TO JUMP <span className="text-lg leading-none">→</span>
        </span>
      </div>
    </div>
  );
}