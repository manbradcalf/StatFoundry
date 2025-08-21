import { useState, useCallback, useMemo } from "react";
import { alwaysVisibleColumns } from "../config";

interface UseColumnVisibilityProps {
  availableColumns: string[];
}

interface UseColumnVisibilityReturn {
  visibleColumns: string[];
  isColumnVisible: (column: string) => boolean;
  toggleColumn: (column: string) => void;
  hideColumn: (column: string) => void;
  showColumn: (column: string) => void;
  toggleGroup: (columns: string[]) => void;
  showAllColumns: () => void;
  hideAllNonEssential: () => void;
  resetToDefaults: () => void;
  canHideColumn: (column: string) => boolean;
}

/**
 * Hook for managing column visibility state (simple show/hide toggle)
 */
export const useColumnVisibility = ({
  availableColumns,
}: UseColumnVisibilityProps): UseColumnVisibilityReturn => {
  // Simple state - start with all columns visible
  const [visibleColumnSet, setVisibleColumnSet] = useState<Set<string>>(() => 
    new Set(availableColumns)
  );

  // Convert to array for easier consumption
  const visibleColumns = useMemo(() => {
    return availableColumns.filter(col => visibleColumnSet.has(col));
  }, [availableColumns, visibleColumnSet]);

  const isColumnVisible = useCallback((column: string) => {
    return visibleColumnSet.has(column);
  }, [visibleColumnSet]);

  const canHideColumn = useCallback((column: string) => {
    return !alwaysVisibleColumns.includes(column);
  }, []);

  const toggleColumn = useCallback((column: string) => {
    if (!canHideColumn(column)) return; // Cannot toggle always-visible columns

    setVisibleColumnSet(prev => {
      const newSet = new Set(prev);
      if (newSet.has(column)) {
        newSet.delete(column);
      } else {
        newSet.add(column);
      }
      return newSet;
    });
  }, [canHideColumn]);

  const hideColumn = useCallback((column: string) => {
    if (!canHideColumn(column)) return;
    
    setVisibleColumnSet(prev => {
      const newSet = new Set(prev);
      newSet.delete(column);
      return newSet;
    });
  }, [canHideColumn]);

  const showColumn = useCallback((column: string) => {
    setVisibleColumnSet(prev => {
      const newSet = new Set(prev);
      newSet.add(column);
      return newSet;
    });
  }, []);

  const toggleGroup = useCallback((columns: string[]) => {
    const toggleableColumns = columns.filter(canHideColumn);
    if (toggleableColumns.length === 0) return;

    const visibleInGroup = toggleableColumns.filter(col => visibleColumnSet.has(col));
    const shouldShowAll = visibleInGroup.length < toggleableColumns.length;

    setVisibleColumnSet(prev => {
      const newSet = new Set(prev);
      
      if (shouldShowAll) {
        // Show all toggleable columns in the group
        toggleableColumns.forEach(col => newSet.add(col));
      } else {
        // Hide all toggleable columns in the group
        toggleableColumns.forEach(col => newSet.delete(col));
      }
      
      return newSet;
    });
  }, [canHideColumn, visibleColumnSet]);

  const showAllColumns = useCallback(() => {
    setVisibleColumnSet(new Set(availableColumns));
  }, [availableColumns]);

  const hideAllNonEssential = useCallback(() => {
    setVisibleColumnSet(new Set(alwaysVisibleColumns.filter(col => availableColumns.includes(col))));
  }, [availableColumns]);

  const resetToDefaults = useCallback(() => {
    setVisibleColumnSet(new Set(availableColumns));
  }, [availableColumns]);

  return {
    visibleColumns,
    isColumnVisible,
    toggleColumn,
    hideColumn,
    showColumn,
    toggleGroup,
    showAllColumns,
    hideAllNonEssential,
    resetToDefaults,
    canHideColumn,
  };
};