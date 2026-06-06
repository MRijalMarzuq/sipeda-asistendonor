// =============================================
// KONFIGURASI OPENROUTER
// Ganti VITE_OPENROUTER_API_KEY di file .env
// atau langsung isi di sini untuk testing
// =============================================

// src/utils/constants.js
export const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "sk-or-v1-GANTI_API_KEY_ANDA";

// src/utils/constants.js

export const MODEL = "meta-llama/llama-3-8b-instruct:free";

export const AVAILABLE_MODELS = [
  { id: "meta-llama/llama-3-8b-instruct:free", label: "Bot Donor", badge: "AI" },
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
