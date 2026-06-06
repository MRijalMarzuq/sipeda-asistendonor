export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3 animate-fade-in">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
        AI
      </div>
      {/* Bubble */}
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
