import React, { useRef, useEffect } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { Suggestions } from './Suggestions';

export const SearchResultItem: React.FC<{result: any}> = ({result}) => {
  const formatKey = (key: string) => {
    return key
      .replace(/^pg\./, '') // Remove pg. prefix
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
      .replace(/^ps\./, '') // Remove ps. prefix
      .replace(/^recent_team/, 'team') // Rename confusing property name
  };

  const formatValue = (value: any) => {
    if (value === null) return <span className="null-value">null</span>;
    if (typeof value === 'boolean') return <span className={`boolean-value ${value}`}>{value.toString()}</span>;
    if (typeof value === 'number') return <span className="number-value">{value}</span>;
    if (typeof value === 'string') return <span className="string-value">"{value}"</span>;
    return <span className="other-value">{JSON.stringify(value)}</span>;
  };

  const getPlayerName = () => {
    return result['pg.player_display_name'] || result['player_display_name'] || result['display_name'] || 'Unknown Player';
  };

  const keys = Object.keys(result);
  const otherKeys = keys.filter(key => !key.includes('player_display_name'));

  return (
    <div className="search-result-item">
      <div className="player-header">
        <h3 className="player-name">{getPlayerName()}</h3>
      </div>
      <div className="stats-grid">
        {otherKeys.map((key) => (
          <div key={key} className="stat-item">
            <span className="stat-label">{formatKey(key)}</span>
            <span className="stat-value">{formatValue(result[key])}</span>
          </div>
        ))}
      </div>
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
    chain
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
          placeholder={chain.Tail?.chunk.English || "Running backs who rushed for..."}
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
          💾
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