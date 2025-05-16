import React from "react";
import { BaseChunk, ChunkSuggestion } from "./types";

interface SuggestionsListProps {
  suggestions: ChunkSuggestion[];
  onSelect: (suggestion: ChunkSuggestion) => void;
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions, onSelect }) => (
  <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
    {suggestions.map((suggestion, index) => {
      const color = (suggestion.chunk as BaseChunk).Color || '#1d4ed8'; // Tailwind blue-700
      return (
        <li key={index}>
          <button
            onClick={() => onSelect(suggestion)}
            className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100 focus:outline-none transition-colors"
            style={{ color }}
          >
            {suggestion.chunk.English}
          </button>
        </li>
      );
    })}
  </ul>
);