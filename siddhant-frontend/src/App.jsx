import UploadSection from './components/UploadSection';
import SearchSection from './components/SearchSection';
import ResultCard from './components/ResultCard';
import VideoSection from './components/VideoSection';

export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 font-sans">
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">AI Video Search Engine</h1>
        <p className="text-gray-600 text-lg">Search inside your videos using natural language.</p>
      </div>

      {/* COMPONENTS */}
      <UploadSection />
      <SearchSection />

      {/* RESULTS GRID */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Search Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCard />
          <ResultCard />
          <ResultCard />
        </div>
      </div>

      {/* VIDEO PLAYER SECTION */}
      <VideoSection />

    </div>
  );
}