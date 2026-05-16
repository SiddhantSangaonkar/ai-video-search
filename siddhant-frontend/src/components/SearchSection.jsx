export default function SearchSection() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Search the Transcript</h2>
      <div className="flex gap-4">
        <input 
          type="text" 
          placeholder="e.g., 'the part where we traverse the graph using DFS...'" 
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {/* <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded transition duration-200">
          Search
        </button> */}
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg">
          Search
        </button>
      </div>
    </div>
  );
}