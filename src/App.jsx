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
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center p-0 sm:p-4">
      <div className="h-full w-full max-w-5xl bg-white flex flex-col shadow-lg overflow-hidden sm:rounded-xl sm:h-[90vh]">
        
        <ChatHeader onClear={clearChat} />

        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSuggestionSelect={sendMessage}
        />

        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
        />
        
      </div>
    </div>
  );
}
