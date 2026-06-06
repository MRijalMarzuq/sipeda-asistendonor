// Render satu bubble pesan (user / assistant)
// Mendukung bold markdown sederhana (**teks**)

function formatContent(text) {
  // Ganti **teks** jadi <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    // Ganti backtick inline `code`
    const codeParts = part.split(/(`[^`]+`)/g);
    return codeParts.map((cp, j) => {
      if (cp.startsWith("`") && cp.endsWith("`")) {
        return (
          <code key={`${i}-${j}`} className="bg-black/10 px-1 py-0.5 rounded text-[0.85em] font-mono">
            {cp.slice(1, -1)}
          </code>
        );
      }
      return <span key={`${i}-${j}`}>{cp}</span>;
    });
  });
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessage({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`flex items-end gap-2 mb-3 animate-slide-up ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mb-1 ${
          isUser
            ? "bg-gradient-to-br from-blue-500 to-indigo-600"
            : msg.isError
            ? "bg-gradient-to-br from-orange-400 to-red-500"
            : "bg-gradient-to-br from-red-500 to-rose-600"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col max-w-[78%] gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isUser
              ? "bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-br-none shadow-sm"
              : msg.isError
              ? "bg-orange-50 border border-orange-200 text-orange-800 rounded-bl-none"
              : "bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm"
          }`}
        >
          {formatContent(msg.content)}
        </div>
       <span className="text-[10px] text-gray-400 px-1">
        {formatTime(msg.timestamp)}
        <span className="ml-1 opacity-60">
        · {isUser ? "Anda" : "Asisten Donor"}
        </span>
       </span>
      </div>
    </div>
  );
}
