import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAvailableChunks } from '../chunks-data';
import { ChunkChain } from '../feature/Search/ChunkChain';
import { Chunk } from '../feature/Search/Chunk';

interface Suggestion {
  chunk: Chunk;
  displayText: string;
}

interface SearchContextType {
  // State
  query: string;
  chain: ChunkChain;
  suggestions: Suggestion[];
  showSuggestions: boolean;
  selectedSuggestionIndex: number;
  builtQuery: { English: string; Cypher: string; Outputs: string[] } | null;
  
  // Actions
  setQuery: (query: string) => void;
  handleSuggestionClick: (suggestion: Suggestion) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  clearQuery: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [chain, setChain] = useState(new ChunkChain());
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [builtQuery, setBuiltQuery] = useState<{ English: string; Cypher: string; Outputs: string[] } | null>(null);

  // Extract the partial input that the user is currently typing
  const getPartialInput = (): string => {
    const chainArray = chain.toArray();
    if (chainArray.length === 0) return query.trim();
    
    // Get the built English from current chain
    const builtEnglish = chain.buildQuery().English;
    
    // If the query is longer than the built English, extract the partial input
    if (query.length > builtEnglish.length) {
      const partial = query.substring(builtEnglish.length).trim();
      // Remove leading "and " if present
      return partial.startsWith('and ') ? partial.substring(4).trim() : partial;
    }
    
    return '';
  };

  // Update suggestions based on current query and chain state
  useEffect(() => {
    console.log('🔍 useEffect triggered:', { query, chainLength: chain.toArray().length });
    
    if (query.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const currentOutputs = chain.outputVars;
    const availableChunks = getAvailableChunks();
    const partialInput = getPartialInput();
    
    console.log('📊 Debug info:', { 
      currentOutputs, 
      availableChunksCount: availableChunks.length,
      partialInput: `"${partialInput}"`
    });
    
    // Filter chunks based on:
    // 1. If chain is empty, show chunks with no required inputs
    // 2. If chain has chunks, show chunks whose required inputs are satisfied by current outputs
    const validChunks = availableChunks.filter(chunk => {
      if (chain.toArray().length === 0) {
        return chunk.RequiredInputs.length === 0;
      }
      return chunk.RequiredInputs.every(input => currentOutputs.includes(input));
    });

    // Filter by partial input text and create suggestions
    const filteredSuggestions = validChunks
      .filter(chunk => {
        if (!partialInput) return true; // Show all valid chunks if no partial input
        
        // Filter chunks that start with or contain the partial input
        return chunk.English.toLowerCase().includes(partialInput.toLowerCase());
      })
      .map(chunk => ({
        chunk,
        displayText: chain.toArray().length > 0 ? "and " + chunk.English : chunk.English
      }));

    setSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0);
    setSelectedSuggestionIndex(-1);
  }, [query, chain]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    console.log('🎯 Suggestion clicked:', suggestion);
    
    // Add the selected chunk to the chain
    const newChain = new ChunkChain();
    
    // Copy existing chunks
    chain.toArray().forEach(chunk => newChain.append(chunk));
    
    // Add new chunk
    newChain.append(suggestion.chunk);
    
    setChain(newChain);
    
    // Update query to show the built query so far
    const result = newChain.buildQuery();
    setQuery(result.English);
    setBuiltQuery(result);
    
    // Clear suggestions
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = selectedSuggestionIndex < suggestions.length - 1 ? selectedSuggestionIndex + 1 : selectedSuggestionIndex;
        setSelectedSuggestionIndex(nextIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : -1;
        setSelectedSuggestionIndex(prevIndex);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const clearQuery = () => {
    setQuery('');
    setChain(new ChunkChain());
    setBuiltQuery(null);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const value: SearchContextType = {
    // State
    query,
    chain,
    suggestions,
    showSuggestions,
    selectedSuggestionIndex,
    builtQuery,
    
    // Actions
    setQuery,
    handleSuggestionClick,
    handleKeyDown,
    clearQuery,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 