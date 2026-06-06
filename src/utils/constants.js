// =============================================
// KONFIGURASI OPENROUTER
// Ganti VITE_OPENROUTER_API_KEY di file .env
// atau langsung isi di sini untuk testing
// =============================================

export const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "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";

export const MODEL = "openai/gpt-3.5-turbo";

export const AVAILABLE_MODELS = [
  { id: "openai/gpt-3.5-turbo", label: "Bot Donor", badge: "AI" },
];

export const SYSTEM_PROMPT = `Kamu adalah asisten donor darah yang ramah, informatif, dan penuh empati.
Tugasmu membantu menjawab pertanyaan seputar:
- Syarat dan ketentuan donor darah
- Jadwal dan lokasi donor darah
- Manfaat donor darah bagi kesehatan
- Persiapan sebelum donor (makanan, istirahat, dll)
- Pasca donor (pemulihan, pantangan, dll)
- Golongan darah dan stok darah

Selalu jawab dalam Bahasa Indonesia yang hangat, ramah, dan mudah dimengerti.
Jika pertanyaan di luar topik donor darah, tetap bantu semampumu namun arahkan kembali ke topik donor.
Gunakan emoji sesekali agar percakapan terasa lebih hidup.`;

export const SUGGESTION_PROMPTS = [
  "Apa saja syarat donor darah?",
  "Berapa interval minimal donor?",
  "Apa manfaat rutin donor darah?",
  "Makanan apa yang baik sebelum donor?",
  "Berapa lama proses donor darah?",
  "Apakah donor darah terasa sakit?",
];
