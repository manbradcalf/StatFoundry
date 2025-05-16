import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { BaseChunk, ChunkSuggestion, PlaceholderValue } from "./types";
import { fetchSchema } from "./api";
import { generateChunksFromSchema } from "./chunkGenerator";
import { SuggestionsList } from "./SuggestionsList";

const ChunkSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [suggestions, setSuggestions] = useState<ChunkSuggestion[]>([]);
  const [selectedChunk, setSelectedChunk] = useState<BaseChunk | null>(null);
  const [placeholderValues, setPlaceholderValues] = useState<PlaceholderValue[]>([]);
  const [chunks, setChunks] = useState<BaseChunk[]>([]);

  // Fetch schema and generate chunks on mount
  useEffect(() => {
    const initializeChunks = async () => {
      try {
        const schema = await fetchSchema();
        if (!schema) {
          console.error("Schema is undefined!");
          return;
        }
        const generatedChunks = generateChunksFromSchema(schema);
        setChunks(generatedChunks);
      } catch (error) {
        console.error("Failed to initialize chunks:", error);
      }
    };
    initializeChunks();
  }, []);

  // Update suggestions based on search term
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

  const handleChunkSelect = (suggestion: ChunkSuggestion) => {
    setSelectedChunk(suggestion.chunk);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handlePlaceholderValueChange = (key: string, value: string) => {
    setPlaceholderValues((prev) => {
      const existing = prev.find((pv) => pv.key === key);
      if (existing) {
        return prev.map((pv) => (pv.key === key ? { key, value } : pv));
      }
      return [...prev, { key, value }];
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Start typing to search for chunks..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {suggestions.length > 0 && (
          <SuggestionsList suggestions={suggestions} onSelect={handleChunkSelect} />
        )}
      </div>
      {selectedChunk && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Selected Chunk:</h3>
          <p className="mb-4">{selectedChunk.English}</p>
          {selectedChunk.English.match(/\{([^}]+)\}/g)?.map((placeholder, index) => {
            const key = placeholder.slice(1, -1);
            const value = placeholderValues.find((pv) => pv.key === key)?.value || "";
            return (
              <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {key}:
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handlePlaceholderValueChange(key, e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder={`Enter ${key}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChunkSearch; 