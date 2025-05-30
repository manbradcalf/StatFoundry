import React, { useRef, useEffect } from 'react';
import { Chunk } from '../chunks';

interface Suggestion {
  chunk: Chunk;
  displayText: string;
}

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  suggestions: Suggestion[];
  showSuggestions: boolean;
  selectedSuggestionIndex: number;
  onSuggestionClick: (suggestion: Suggestion) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onClearQuery: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  suggestions,
  showSuggestions,
  selectedSuggestionIndex,
  onSuggestionClick,
  onKeyDown,
  onClearQuery,
  placeholder = "Receivers who caught at least..."
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
    
    // Move cursor to end of input
    setTimeout(() => {
      if (inputRef.current) {
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
      }
    }, 0);
  };

  const scrollToSuggestion = (index: number) => {
    if (suggestionsRef.current) {
      const suggestionElement = suggestionsRef.current.children[index] as HTMLElement;
      if (suggestionElement) {
        suggestionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  };

  // Scroll to suggestion when selectedSuggestionIndex changes
  useEffect(() => {
    if (selectedSuggestionIndex >= 0) {
      scrollToSuggestion(selectedSuggestionIndex);
    }
  }, [selectedSuggestionIndex]);

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
        />
        {query && (
          <button onClick={onClearQuery} className="clear-button">
            ×
          </button>
        )}
      </div>
      
      {showSuggestions && (
        <div ref={suggestionsRef} className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion.displayText}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 