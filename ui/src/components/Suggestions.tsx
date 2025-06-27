import { Suggestion } from "../contexts/Suggestion";

export const Suggestions = ({
    suggestions,
    onSuggestionClick,
    suggestionsRef,
    selectedIndex,
}: {
    suggestions: Suggestion[],
    onSuggestionClick: (suggestion: Suggestion) => void,
    suggestionsRef: React.RefObject<HTMLDivElement>,
    selectedIndex: number,
}) => {
      return suggestions.length > 0 && (
        <div ref={suggestionsRef} className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion.chunk.English}
            </div>
          ))}
        </div>
      )
};