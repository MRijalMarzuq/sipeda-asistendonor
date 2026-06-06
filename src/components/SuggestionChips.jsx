import { SUGGESTION_PROMPTS } from "../utils/constants";

export default function SuggestionChips({ onSelect }) {
  return (
    <div className="px-4 pt-2 pb-3 bg-white border-t border-gray-100">
      <p className="text-[11px] text-gray-400 mb-2 font-medium uppercase tracking-wide">Pertanyaan umum</p>
      <div className="flex flex-wrap gap-1.5">
        {SUGGESTION_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            className="text-xs bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 hover:border-red-400 px-3 py-1.5 rounded-full transition-all duration-200 hover:shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
