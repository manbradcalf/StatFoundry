import { useState } from 'react';

interface UseFocusManagementReturn {
  shouldFocusSearchBar: boolean;
  focusSearchBar: () => void;
  resetFocusFlag: () => void;
}

export const useFocusManagement = (): UseFocusManagementReturn => {
  const [shouldFocusSearchBar, setShouldFocusSearchBar] = useState(false);

  const focusSearchBar = () => {
    setShouldFocusSearchBar(true);
  };

  const resetFocusFlag = () => {
    setShouldFocusSearchBar(false);
  };

  return {
    shouldFocusSearchBar,
    focusSearchBar,
    resetFocusFlag
  };
};