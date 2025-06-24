import React, { useRef, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';

interface SearchBarProps {
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Receivers who caught at least..."
}) => {
  const {
    userInput,
    setUserInput,
    suggestions,
    selectSuggestion,
    handleKeyDown,
    clearAll,
    selectedIndex,
    search,
    searchResults,
    searchError
  } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    
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

  // Scroll to suggestion when selectedIndex changes
  useEffect(() => {
    if (selectedIndex >= 0) {
      scrollToSuggestion(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          autoComplete="off"
        />
        {userInput && (
          <button onClick={clearAll} className="clear-button">
            ×
          </button>
        )}
      </div>
      <div className="search-button">
        <button onClick={search}>Search</button>
      </div>

      {suggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion.chunk.English}
            </div>
          ))}
        </div>
      )}
      <div className="search-results">
        <div className="search-results-header">
          <h2>Search Results</h2>
        </div>
        <div className="search-results-body">
          <p>{searchResults ? JSON.stringify(searchResults) : 'No results'}</p>
          <p>{searchError ? searchError : 'No error'}</p>
        </div>
      </div>
    </div>
  );
}; 