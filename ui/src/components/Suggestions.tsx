import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPlay,
  faArrowLeft,
  faShareNodes,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Suggestion } from "../contexts/Suggestion";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { QueryType } from "../feature/Chunks/Enums/QueryType";
import { createHighlightedText } from "../utils/englishHighlighter";

interface SuggestionsProps {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (suggestion: Suggestion, index: number) => void;
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
 * Gets the appropriate icon and CSS class modifier for a chunk's QueryType
 */
const getChunkTypeInfo = (queryType: QueryType) => {
  switch (queryType) {
    case QueryType.MATCH_START:
      return {
        icon: faCircle,
        modifier: "match-start",
        title: "Match Start - Finds initial nodes",
      };
    case QueryType.JUNCTION:
      return {
        icon: faShareNodes,
        modifier: "junction",
        title: "Junction - Connects to related entities",
      };
    case QueryType.FILTER:
      return {
        icon: faFilter,
        modifier: "filter",
        title: "Filter - Adds conditions to narrow results",
      };
    case QueryType.RETURN:
      return {
        icon: faArrowLeft,
        modifier: "return",
        title: "Return - Selects output columns",
      };
    default:
      return {
        icon: faPlay,
        modifier: "default",
        title: "Query chunk",
      };
  }
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
        {suggestions.map((suggestion, index) => {
          const chunkTypeInfo = getChunkTypeInfo(suggestion.chunk.QueryType);
          return (
            <div
              key={index}
              className={`suggestion-item suggestion-item--${chunkTypeInfo.modifier} ${
                index === selectedIndex ? "selected" : ""
              }`}
              onMouseDown={(e) => {
                if (e.button === 0) {
                  // Left click only
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(suggestion, index);
                }
              }}
              onMouseEnter={() => {
                // Visual feedback when hovering - could add hover state management here
              }}
              title={chunkTypeInfo.title}
            >
              <div className="suggestion-content">
                <FontAwesomeIcon
                  icon={chunkTypeInfo.icon}
                  className="suggestion-icon"
                  size="sm"
                />
                <span className="suggestion-text">
                  {createHighlightedSuggestionText(suggestion.chunk)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

Suggestions.displayName = "Suggestions";
