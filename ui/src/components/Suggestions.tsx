import React, { forwardRef } from 'react';
import { Suggestion } from '../contexts/Suggestion';
import { Chunk } from '../feature/Chunks/Types/Chunk';

interface SuggestionsProps {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (suggestion: Suggestion) => void;
}

/**
 * Creates highlighted suggestion text by finding slot values in the filled English text
 * and wrapping them with highlighting spans.
 */
const createHighlightedSuggestionText = (chunk: Chunk): React.ReactNode => {
  // If no slots or no template, just return plain text
  if (!chunk.Slots || chunk.Slots.length === 0 || !chunk.EnglishTemplate) {
    return chunk.English;
  }

  const text = chunk.English;
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Create array of slot value positions in the text
  const slotPositions: { start: number; end: number; value: string; slotIndex: number }[] = [];
  
  chunk.Slots.forEach((slot, slotIndex) => {
    const value = String(slot.Value);
    const index = text.indexOf(value, currentIndex);
    if (index !== -1) {
      slotPositions.push({
        start: index,
        end: index + value.length,
        value: value,
        slotIndex: slotIndex
      });
    }
  });

  // Sort by position to process in order
  slotPositions.sort((a, b) => a.start - b.start);

  let textIndex = 0;
  
  slotPositions.forEach((position, index) => {
    // Add text before this slot value
    if (position.start > textIndex) {
      parts.push(text.substring(textIndex, position.start));
    }
    
    // Add highlighted slot value
    parts.push(
      <span key={`slot-${position.slotIndex}-${index}`} className="suggestion-slot-value">
        {position.value}
      </span>
    );
    
    textIndex = position.end;
  });

  // Add remaining text after last slot
  if (textIndex < text.length) {
    parts.push(text.substring(textIndex));
  }

  return <>{parts}</>;
};

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
            {/* Display the suggestion text with highlighted slot values */}
            {createHighlightedSuggestionText(suggestion.chunk)}
          </div>
        ))}
      </div>
    );
  }
);

Suggestions.displayName = 'Suggestions';