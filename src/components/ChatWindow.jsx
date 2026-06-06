import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import SuggestionChips from "./SuggestionChips";

export default function ChatWindow({ messages, isLoading, onSuggestionSelect }) {
  const bottomRef = useRef(null);
  const showSuggestions = messages.length <= 1 && !isLoading;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col justify-between">
      <div className="space-y-4 w-full flex-1 mb-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {showSuggestions && (
        <div className="mt-2">
          <SuggestionChips onSelect={onSuggestionSelect} />
        </div>
      )}
    </div>
  );
}
