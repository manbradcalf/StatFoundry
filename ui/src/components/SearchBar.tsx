import React, { useRef, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Receivers who caught at least..."
}) => {
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    selectedSuggestionIndex,
    handleSuggestionClick,
    handleKeyDown,
    clearQuery
  } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    
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
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
        />
        {query && (
          <button onClick={clearQuery} className="clear-button">
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
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.chunk.English}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 