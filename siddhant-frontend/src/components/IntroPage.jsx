export default function IntroPage({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden text-center">
      {/* Background Glowing Energy Curves */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="z-10 max-w-3xl px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 mb-6 drop-shadow-lg">
          AI-POWERED VIDEO SEARCH ENGINE
        </h1>
        <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide mb-12">
          Locate moments instantly. Understands context and language.
        </p>

        <button 
          onClick={onStart}
          className="relative inline-flex items-center justify-center w-40 h-40 rounded-full border border-blue-500/50 bg-slate-900/50 text-blue-400 font-bold tracking-widest hover:text-white hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] group"
        >
          <span className="absolute inset-2 rounded-full border border-blue-400/20 animate-ping opacity-75"></span>
          GET STARTED
        </button>
      </div>
    </div>
  );
}