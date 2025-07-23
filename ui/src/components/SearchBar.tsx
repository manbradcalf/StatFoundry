import React, { useRef, useEffect } from "react";
import { useSearchContext } from "../contexts/IntegratedSearchContext";
import { Suggestions } from "./Suggestions";

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
    shouldFocusSearchBar,
    resetFocusFlag,
    showSuggestions,
    handleInputFocus,
    handleInputBlur,
  } = useSearchContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);

    // Move cursor to end of input after state update
    setTimeout(() => {
      if (inputRef.current) {
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 0);
  };

  const scrollToSuggestion = (index: number) => {
    if (suggestionsRef.current) {
      const suggestionElement = suggestionsRef.current.children[
        index
      ] as HTMLElement;
      if (suggestionElement) {
        suggestionElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
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
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={
              suggestions[0].chunk.English || "RB Games..."
            }
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
          <button
            className="secondary-button"
            title="Save this search (coming soon)"
            onClick={() => alert("Save Search functionality coming soon!")}
          >
            Save
          </button>
        </div>
      </div>

      {/* Suggestions dropdown - appears directly below search input */}
      <Suggestions
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onSelect={selectSuggestion}
        showSuggestions={showSuggestions}
        ref={suggestionsRef}
      />
    </div>
  );
};
