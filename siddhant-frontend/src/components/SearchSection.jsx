import { useState } from 'react';

export default function SearchSection({ onSearch, isSearching }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25"></div>
      <div className="relative flex items-center bg-slate-900 border border-slate-700/50 rounded-full px-6 py-4 shadow-2xl">
        <svg className="w-6 h-6 text-blue-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search inside the video transcript..." 
          className="flex-1 bg-transparent outline-none text-slate-200 placeholder-slate-500 font-light tracking-wide text-lg"
          disabled={isSearching}
        />
        <button type="submit" disabled={isSearching} className="hidden"></button>
      </div>
    </form>
  );
}