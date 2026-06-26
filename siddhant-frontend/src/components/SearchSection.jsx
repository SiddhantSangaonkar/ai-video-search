import { useState } from 'react';

export default function SearchSection({ onSearch, isSearching }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative group">
      {/* Outer subtle glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Chat Box Container */}
      <div className="relative flex items-center bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700/50 rounded-3xl px-6 py-4 shadow-2xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors">
        
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about a topic or exact phrase..." 
          className="flex-1 bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 font-normal text-lg"
          disabled={isSearching}
        />
        
        {/* Send Button */}
        <button 
          type="submit" 
          disabled={isSearching || !query.trim()} 
          className={`ml-4 p-2 rounded-full transition-all duration-300 ${
            query.trim() && !isSearching 
              ? 'bg-blue-600 text-white shadow-lg hover:scale-110 hover:bg-blue-500' 
              : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          {isSearching ? (
             <div className="w-6 h-6 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></div>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}