import { useState, useEffect } from "react";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { ChunkChain } from "../feature/Chunks/ChunkChain";
import { useDebounce } from "use-debounce";
import Fuse from "fuse.js";

export interface ChunkSuggestion {
  chunk: Chunk;
  matchScore: number;
  placeholders: string[];
}

const useSuggestions = (
  searchTerm: string,
  allChunks: Chunk[],
  chunkChain: ChunkChain,
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
    const fuse = new Fuse(validChunks, {
      keys: ["English", "EnglishTemplate"],
      threshold: 0.7,
    });
    const matchedChunks = fuse.search(debouncedSearch).map(result => result.item);

    const newSuggestions = matchedChunks.map((chunk) => {
      // Extract placeholders from English template
      const placeholders =
        chunk.English.match(/\{([^}]+)\}/g)?.map((p) => p.slice(1, -1)) || [];

      return {
        chunk,
        matchScore: 1,
        placeholders,
      };
    });

    setSuggestions(newSuggestions);
  }, [debouncedSearch, allChunks, chunkChain]);

  return suggestions;
};

export default useSuggestions;

