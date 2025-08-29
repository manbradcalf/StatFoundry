import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Suggestion } from "./Suggestion";
import useSuggestionsTwo from "../hooks/useSuggestionsTwo";
import { useChunkGenerator } from "../hooks/useChunkGenerator";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { ChunkChain } from "../feature/Chunks/ChunkChain";

interface SearchInputContextType {
  // State
  query: string;
  suggestions: Suggestion[];
  selectedIndex: number;
  showSuggestions: boolean;
  isInputFocused: boolean;

  // Actions
  setQuery: (query: string) => void;
  selectSuggestion: (suggestion: Suggestion, index?: number) => void;
  clearQuery: () => void;
  
  // Input focus handling
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  
  // Keyboard navigation
  handleKeyDown: (e: React.KeyboardEvent) => void;
  
  // Suggestions visibility
  toggleSuggestions: () => void;
}

const SearchInputContext = createContext<SearchInputContextType | undefined>(undefined);

export const useSearchInputContext = () => {
  const context = useContext(SearchInputContext);
  if (!context) {
    throw new Error("useSearchInputContext must be used within a SearchInputProvider");
  }
  return context;
};

interface SearchInputProviderProps {
  children: ReactNode;
  chain: ChunkChain;
  insertingAtIndex?: number | null;
  onSuggestionSelect: (suggestion: Suggestion, index?: number) => void;
  onExecuteSearch?: () => void;
}

export const SearchInputProvider: React.FC<SearchInputProviderProps> = ({ 
  children, 
  chain,
  insertingAtIndex,
  onSuggestionSelect,
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Get all chunks (static + dynamic)
  const { allChunks } = useChunkGenerator();
  
  // Generate suggestions using two-step filtering
  const rawSuggestions = useSuggestionsTwo(query, allChunks, chain);
  
  // Transform suggestions to match expected Suggestion interface
  const enhancedSuggestions = rawSuggestions.map(suggestion => ({
    chunk: suggestion.chunk,
    displayText: suggestion.chunk.English
  }));

  // Control suggestion visibility based on input state
  const handleInputFocus = useCallback(() => {
    setIsInputFocused(true);
    if (query.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  const handleInputBlur = useCallback(() => {
    setIsInputFocused(false);
    // Small delay to allow suggestion clicks to register
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  }, []);

  // Show enhancedSuggestions when user types (if input is focused)
  useEffect(() => {
    if (isInputFocused && query.length > 0) {
      setShowSuggestions(true);
    } else if (query.length === 0) {
      setShowSuggestions(false);
    }
  }, [query, isInputFocused]);

  // Toggle enhancedSuggestions visibility
  const toggleSuggestions = useCallback(() => {
    setShowSuggestions(prev => !prev);
  }, []);

  // Handle suggestion selection
  const handleSuggestionClick = useCallback(
    (suggestion: Suggestion, index?: number) => {
      setShowSuggestions(false);
      setQuery(""); // Clear the search input
      onSuggestionSelect(suggestion, index);
    },
    [onSuggestionSelect]
  );

  // Use keyboard navigation hook
  const {
    selectedIndex,
    selectedSuggestion,
    setKeyboardNavigationEnabled,
    handleKeyDown,
    clearSelection,
  } = useKeyboardNavigation({
    suggestions: enhancedSuggestions,
    toggleSuggestions,
  });

  // Watch for keyboard selection events
  useEffect(() => {
    if (selectedSuggestion) {
      const suggestionIndex = enhancedSuggestions.findIndex(s => s === selectedSuggestion);
      handleSuggestionClick(selectedSuggestion, suggestionIndex);
      clearSelection();
    }
  }, [selectedSuggestion, handleSuggestionClick, clearSelection, enhancedSuggestions]);

  // Auto-enable keyboard navigation when enhancedSuggestions become available
  useEffect(() => {
    if (enhancedSuggestions.length > 0) {
      setKeyboardNavigationEnabled(true);
    } else {
      setKeyboardNavigationEnabled(false);
    }
  }, [enhancedSuggestions, setKeyboardNavigationEnabled]);

  // Clear query
  const clearQuery = useCallback(() => {
    setQuery("");
    setShowSuggestions(false);
    clearSelection();
  }, [clearSelection]);

  const value: SearchInputContextType = {
    // State
    query,
    suggestions: enhancedSuggestions,
    selectedIndex,
    showSuggestions,
    isInputFocused,

    // Actions
    setQuery,
    selectSuggestion: handleSuggestionClick,
    clearQuery,
    
    // Input focus handling
    handleInputFocus,
    handleInputBlur,
    
    // Keyboard navigation
    handleKeyDown,
    
    // Suggestions visibility
    toggleSuggestions,
  };

  return (
    <SearchInputContext.Provider value={value}>
      {children}
    </SearchInputContext.Provider>
  );
};