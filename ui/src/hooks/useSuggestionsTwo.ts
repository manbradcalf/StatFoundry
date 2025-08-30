import { useState, useEffect } from "react";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { ChunkChain } from "../feature/Chunks/ChunkChain";
import { useDebounce } from "use-debounce";

export interface ChunkSuggestion {
  chunk: Chunk;
  matchScore: number;
  placeholders: string[];
}

const useSuggestionsTwo = (
  searchTerm: string, 
  allChunks: Chunk[], 
  chunkChain: ChunkChain
) => {
  const [suggestions, setSuggestions] = useState<ChunkSuggestion[]>([]);
  const [debouncedSearch] = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (!debouncedSearch) {
      setSuggestions([]);
      return;
    }

    // Step 1: Filter chunks using ChunkChain validation
    const validChunks = chunkChain.getNextValidChunksFromChunks(allChunks);

    // Step 2: Apply fuzzy matching to only the valid chunks
    const newSuggestions = validChunks
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
  }, [debouncedSearch, allChunks, chunkChain]);

  return suggestions;
};

export default useSuggestionsTwo;