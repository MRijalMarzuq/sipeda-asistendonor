import { useState, useCallback } from "react";
import { OPENROUTER_API_KEY, SYSTEM_PROMPT } from "../utils/constants";

const INITIAL_MESSAGE = {
  id: Date.now(),
  role: "assistant",
  content: "Halo! 👋 Saya asisten donor darah Anda.\n\nSaya siap membantu menjawab pertanyaan seputar **donor darah**, syarat donor, jadwal, manfaat, dan informasi kesehatan terkait.\n\nAda yang bisa saya bantu hari ini? 😊",
  timestamp: new Date(),
};

export function useChat(model) {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (userText) => {
      if (!userText.trim() || isLoading) return;

      // Tambahkan baris ini untuk debugging di production:
      console.log("Isi API KEY di Vercel:", import.meta.env.VITE_OPENROUTER_API_KEY);
      
      setError(null);

      const userMessage = {
        id: Date.now(),
        role: "user",
        content: userText.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Bangun history untuk API (tanpa field id & timestamp)
      const history = [...messages, userMessage].map(({ role, content }) => ({
        role,
        content,
      }));

      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "Donor Chatbot",
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...history,
            ],
            max_tokens: 1024,
            temperature: 0.7,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `HTTP Error ${res.status}`);
        }

        const data = await res.json();
        const reply =
          data.choices?.[0]?.message?.content ||
          "Maaf, saya tidak mendapat respons. Silakan coba lagi.";

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: "assistant",
            content: reply,
            timestamp: new Date(),
            model: data.model,
          },
        ]);
      } catch (err) {
        const errMsg = err.message;
        setError(errMsg);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: "assistant",
            content: `⚠️ Terjadi kesalahan:\n\n\`${errMsg}\`\n\nPastikan API key OpenRouter sudah diisi dengan benar di file \`.env\`.`,
            timestamp: new Date(),
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, model]
  );

  const clearChat = useCallback(() => {
    setMessages([{ ...INITIAL_MESSAGE, id: Date.now(), timestamp: new Date() }]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
