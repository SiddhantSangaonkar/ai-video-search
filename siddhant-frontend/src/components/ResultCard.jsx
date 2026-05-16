export default function ResultCard() {
  return (
    // <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition duration-200 cursor-pointer flex gap-4">
    <div className="bg-white p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 cursor-pointer flex gap-4 group">
      <div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded h-fit text-sm">
        02:14
      </div>
      <div>
        <p className="text-gray-700 text-sm">"...so we start the first DFS traversal to push the visited nodes onto the stack before moving on..."</p>
        <p className="text-xs text-gray-400 mt-2">Confidence: 98%</p>
      </div>
    </div>
  );
}