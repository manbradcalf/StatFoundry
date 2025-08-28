import { useState, useEffect } from "react";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { useDebounce } from "use-debounce";

export interface ChunkSuggestion {
  chunk: Chunk;
  matchScore: number;
  placeholders: string[];
}

const useSuggestions = (searchTerm: string, chunks: Chunk[]) => {
  const [suggestions, setSuggestions] = useState<ChunkSuggestion[]>([]);
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (!debouncedSearch) {
      setSuggestions([]);
      return;
    }
    const newSuggestions = chunks
      .map((chunk) => {
        const english = chunk.English.toLowerCase();
        const search = debouncedSearch.toLowerCase();
        const matchScore = english.includes(search) ? 1 : 0;
        // Extract placeholders from English template
        const placeholders = chunk.English.match(/\{([^}]+)\}/g)?.map((p) => p.slice(1, -1)) || [];
        return {
          chunk,
          matchScore,
          placeholders,
        };
      })
      .filter((suggestion) => suggestion.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);
    setSuggestions(newSuggestions);
  }, [debouncedSearch, chunks]);

  return suggestions;
};

export default useSuggestions;

