export default function DemoPreview() {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30">
      <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-sm text-gray-600 ml-2">Article Summary</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded w-full"></div>
          <div className="h-2 bg-gray-200 rounded w-4/5"></div>
          <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded w-3/5"></div>
          <div className="h-2 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-[#3b5b7e] font-medium">
          ✨ 5-minute read → 30 seconds
        </p>
      </div>
    </div>
  );
} 