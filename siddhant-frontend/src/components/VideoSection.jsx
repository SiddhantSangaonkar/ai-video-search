export default function VideoSection({ videoRef, currentVideoSrc }) {
  return (
    <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-2 rounded-2xl shadow-2xl z-10">
      <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
        <video 
          ref={videoRef}
          controls
          className="w-full h-full object-cover"
          src={currentVideoSrc} 
        />
      </div>
    </div>
  );
}