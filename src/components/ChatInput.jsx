import { useRef, useEffect } from "react";

export default function ChatInput({ onSend, isLoading }) {
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const text = textareaRef.current?.value?.trim();
    if (!text || isLoading) return;
    onSend(text);
    textareaRef.current.value = "";
    textareaRef.current.style.height = "auto";
    textareaRef.current.focus();
  };

  return (
    <div ref={containerRef} className="px-3 py-3 bg-white border-t border-gray-100">
      <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 transition-all duration-200">
        <textarea
          ref={textareaRef}
          onKeyDown={handleKeyDown}
          placeholder="Tulis pesan Anda..."
          rows={1}
          disabled={isLoading}
          className="flex-1 bg-transparent resize-none text-sm text-gray-800 placeholder-gray-400 focus:outline-none leading-relaxed disabled:opacity-50"
          style={{ minHeight: "24px", maxHeight: "120px" }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white flex-shrink-0 transition-all duration-200 hover:shadow-md hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Kirim pesan"
        >
          {isLoading ? (
            <svg className="w-3.5 h-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
      <p className="text-center text-[10px] text-gray-300 mt-2">
        Enter untuk kirim &nbsp;·&nbsp; Shift+Enter untuk baris baru
      </p>
    </div>
  );
}
