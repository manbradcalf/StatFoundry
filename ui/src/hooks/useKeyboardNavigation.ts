import { useState, useCallback } from 'react';
import { Suggestion } from '../contexts/Suggestion';

interface UseKeyboardNavigationParams {
  suggestions: Suggestion[];
  onExecuteSearch?: () => void;
  toggleSuggestions: () => void;
}

interface UseKeyboardNavigationReturn {
  selectedIndex: number;
  selectedSuggestion: Suggestion | null;
  keyboardNavigationEnabled: boolean;
  setKeyboardNavigationEnabled: (enabled: boolean) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  clearSelection: () => void;
}

export const useKeyboardNavigation = ({
  suggestions,
  toggleSuggestions
}: UseKeyboardNavigationParams): UseKeyboardNavigationReturn => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [keyboardNavigationEnabled, setKeyboardNavigationEnabled] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

  // Handle keyboard navigation and selection in the suggestions dropdown
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Escape key - disable keyboard navigation
    if (e.key === 'Escape') {
      setKeyboardNavigationEnabled(prev=>!prev);
      if (selectedIndex > 0) {
        setSelectedIndex(-1);
      }
      toggleSuggestions()
      return;
    }

    // Only handle other keys if keyboard navigation is enabled
    if (!keyboardNavigationEnabled || suggestions.length === 0) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Navigate down, don't wrap around at bottom
        const nextIndex = selectedIndex < suggestions.length - 1
          ? selectedIndex + 1
          : selectedIndex;
        setSelectedIndex(nextIndex);
        break;

      case 'ArrowUp':
        e.preventDefault();
        // Navigate up, can go to -1 (no selection)
        const prevIndex = selectedIndex > 0
          ? selectedIndex - 1
          : -1;
        setSelectedIndex(prevIndex);
        break;

      case 'Tab':
        e.preventDefault();
        // Navigate down like ArrowDown, wrapping to first suggestion
        const tabNextIndex = selectedIndex < suggestions.length - 1
          ? selectedIndex + 1
          : 0; // Wrap to first suggestion
        setSelectedIndex(tabNextIndex);
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          // Select highlighted suggestion
          const suggestion = suggestions[selectedIndex];
          setSelectedSuggestion(suggestion);
          // onSelectSuggestion(suggestion); // This line is removed
          setSelectedIndex(-1);
          setKeyboardNavigationEnabled(false);
        }
        break;
    }
  }, [keyboardNavigationEnabled, suggestions, selectedIndex, toggleSuggestions]);

  // Clear selection state
  const clearSelection = useCallback(() => {
    setSelectedIndex(-1);
    setKeyboardNavigationEnabled(false);
    setSelectedSuggestion(null);
  }, []);

  return {
    selectedIndex,
    selectedSuggestion,
    keyboardNavigationEnabled,
    setKeyboardNavigationEnabled,
    handleKeyDown,
    clearSelection
  };
};