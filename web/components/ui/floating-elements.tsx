export default function FloatingElements() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/40 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-300/35 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-10 w-20 h-20 bg-pink-300/35 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-indigo-300/30 rounded-full blur-md animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
} 