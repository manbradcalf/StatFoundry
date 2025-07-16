import React, { forwardRef } from 'react';
import { Suggestion } from '../contexts/Suggestion';
import { Chunk } from '../feature/Chunks/Types/Chunk';
import { createHighlightedText } from '../utils/englishHighlighter';

interface SuggestionsProps {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (suggestion: Suggestion) => void;
  showSuggestions: boolean; // Add this prop
}

/**
 * Creates highlighted suggestion text by finding [bracket] patterns
 * in the English text and wrapping them with highlighting spans.
 */
const createHighlightedSuggestionText = (chunk: Chunk): React.ReactNode => {
  return createHighlightedText(chunk.English);
};

/**
 * Suggestions dropdown component
 * Shows filtered suggestions based on user input and allows selection via mouse/keyboard
 * Positioned absolutely below the search input
 */
export const Suggestions = forwardRef<HTMLDivElement, SuggestionsProps>(
  ({ suggestions, selectedIndex, onSelect, showSuggestions }, ref) => {
    if (suggestions.length === 0 || !showSuggestions) {
      return null;
    }

    return (
      <div ref={ref} className="suggestions-dropdown">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`suggestion-item ${index === selectedIndex ? 'selected' : ''
              }`}
            onClick={() => onSelect(suggestion)}
            onMouseEnter={() => {
              // Visual feedback when hovering - could add hover state management here
            }}
          >
            {/* Display the suggestion text with highlighted slot values */}
            {createHighlightedSuggestionText(suggestion.chunk)}
          </div>
        ))}
      </div>
    );
  }
);

Suggestions.displayName = 'Suggestions';
