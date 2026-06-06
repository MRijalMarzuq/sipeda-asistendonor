import { useState } from "react";
import ChatHeader from "./components/ChatHeader";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { useChat } from "./hooks/useChat";
import { MODEL } from "./utils/constants";

export default function App() {
  const [model] = useState(MODEL);
  const { messages, isLoading, sendMessage, clearChat } = useChat(model);

  return (
    <div className="h-screen w-screen bg-gray-50">
      <div className="h-full max-w-5xl mx-auto bg-white flex flex-col shadow-lg">
        <ChatHeader onClear={clearChat} />

        <div className="flex-1 overflow-hidden">
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSuggestionSelect={sendMessage}
          />
        </div>

        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}