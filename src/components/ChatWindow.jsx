import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import SuggestionChips from "./SuggestionChips";

export default function ChatWindow({ messages, isLoading, onSuggestionSelect }) {
  const bottomRef = useRef(null);
  const showSuggestions = messages.length <= 1 && !isLoading;

  // Auto-scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Scrollable messages area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips (hanya muncul di awal) */}
      {showSuggestions && (
        <SuggestionChips onSelect={onSuggestionSelect} />
      )}
    </div>
  );
}
