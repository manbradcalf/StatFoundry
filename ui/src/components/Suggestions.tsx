import React, { forwardRef } from 'react';
import { Suggestion } from '../contexts/Suggestion';

interface SuggestionsProps {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (suggestion: Suggestion) => void;
}

/**
 * Suggestions dropdown component
 * Shows filtered suggestions based on user input and allows selection via mouse/keyboard
 * Positioned absolutely below the search input
 */
export const Suggestions = forwardRef<HTMLDivElement, SuggestionsProps>(
  ({ suggestions, selectedIndex, onSelect }, ref) => {
    // Don't render if no suggestions
    if (suggestions.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className="suggestions-dropdown">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`suggestion-item ${
              index === selectedIndex ? 'selected' : ''
            }`}
            onClick={() => onSelect(suggestion)}
            onMouseEnter={() => {
              // Visual feedback when hovering - could add hover state management here
            }}
          >
            {/* Display the suggestion text, with "and" prefix for chained queries */}
            {suggestion.chunk.English}
          </div>
        ))}
      </div>
    );
  }
);

Suggestions.displayName = 'Suggestions';