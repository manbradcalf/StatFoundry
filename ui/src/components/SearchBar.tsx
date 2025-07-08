import React, { useRef, useEffect } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { Suggestions } from './Suggestions';

export const SearchResultItem: React.FC<{ result: any }> = ({ result }) => {
  const keys = Object.keys(result);
  const otherKeys = keys.filter(key => !key.includes('player_display_name'));

  return (
    <div className="search-result-item">
      {otherKeys.map((key) => (
        <div key={key} className="stat-item">
          <span className="stat-label">{key}</span>
          <span className="stat-value">{result[key]}</span>
        </div>
      ))}
    </div>
  );
};

export const SearchBar: React.FC = () => {
  const {
    userInput,
    setUserInput,
    suggestions,
    selectSuggestion,
    handleKeyDown,
    clearAll,
    selectedIndex,
    search,
    chain,
    shouldFocusSearchBar,
    resetFocusFlag
  } = useSearchContext();

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

  // Focus search bar when requested
  useEffect(() => {
    if (shouldFocusSearchBar && inputRef.current) {
      inputRef.current.focus();
      resetFocusFlag();
    }
  }, [shouldFocusSearchBar, resetFocusFlag]);

  return (
    <div className="search-container">
      <div className="search-input-row">
        <div className="search-box">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={chain.Tail?.chunk.English || "Running backs who had..."}
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
          <button onClick={search} className="primary-button">
            Search
          </button>
        </div>
        {/* Save search button - functionality to be implemented later */}
        <div className="save-button">
          <button className="secondary-button" title="Save this search (coming soon)" onClick={() => alert("Save Search functionality coming soon!")}>
            Save
          </button>
        </div>
      </div>

      {/* Suggestions dropdown - appears directly below search input */}
      <Suggestions
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onSelect={selectSuggestion}
        ref={suggestionsRef}
      />
    </div>
  );
}; 
