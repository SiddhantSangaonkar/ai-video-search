import ReactPlayer from 'react-player';

export default function VideoSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Video Player</h2>
      <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
        <ReactPlayer 
        //   url="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          url="https://www.w3schools.com/html/mov_bbb.mp4" 
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}