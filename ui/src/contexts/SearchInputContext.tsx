import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Suggestion } from "./Suggestion";
import { useSuggestions } from "../hooks/useSuggestions";
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
  selectSuggestion: (suggestion: Suggestion) => void;
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
  onSuggestionSelect: (suggestion: Suggestion) => void;
  onExecuteSearch?: () => void;
}

export const SearchInputProvider: React.FC<SearchInputProviderProps> = ({ 
  children, 
  chain,
  insertingAtIndex,
  onSuggestionSelect,
  onExecuteSearch
}) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Generate suggestions based on current state
  const suggestions = useSuggestions({
    query,
    chain,
    insertingAtIndex,
  });

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

  // Show suggestions when user types (if input is focused)
  useEffect(() => {
    if (isInputFocused && query.length > 0) {
      setShowSuggestions(true);
    } else if (query.length === 0) {
      setShowSuggestions(false);
    }
  }, [query, isInputFocused]);

  // Toggle suggestions visibility
  const toggleSuggestions = useCallback(() => {
    setShowSuggestions(prev => !prev);
  }, []);

  // Handle suggestion selection
  const handleSuggestionClick = useCallback(
    (suggestion: Suggestion) => {
      setShowSuggestions(false);
      onSuggestionSelect(suggestion);
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
    suggestions,
    onExecuteSearch,
    toggleSuggestions,
  });

  // Watch for keyboard selection events
  useEffect(() => {
    if (selectedSuggestion) {
      handleSuggestionClick(selectedSuggestion);
      clearSelection();
    }
  }, [selectedSuggestion, handleSuggestionClick, clearSelection]);

  // Auto-enable keyboard navigation when suggestions become available
  useEffect(() => {
    if (suggestions.length > 0) {
      setKeyboardNavigationEnabled(true);
    } else {
      setKeyboardNavigationEnabled(false);
    }
  }, [suggestions, setKeyboardNavigationEnabled]);

  // Clear query
  const clearQuery = useCallback(() => {
    setQuery("");
    setShowSuggestions(false);
    clearSelection();
  }, [clearSelection]);

  const value: SearchInputContextType = {
    // State
    query,
    suggestions,
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