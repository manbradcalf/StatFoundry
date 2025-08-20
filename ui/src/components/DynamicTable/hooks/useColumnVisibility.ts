import { useState, useCallback, useMemo, useEffect } from "react";
import { alwaysVisibleColumns } from "../config";

interface UseColumnVisibilityProps {
  availableColumns: string[];
  storageKey?: string;
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
 * Hook for managing column visibility state with localStorage persistence
 */
export const useColumnVisibility = ({
  availableColumns,
  storageKey = "dynamicTable-columnVisibility",
}: UseColumnVisibilityProps): UseColumnVisibilityReturn => {
  // Initialize with all columns visible by default
  const [visibleColumnSet, setVisibleColumnSet] = useState<Set<string>>(() => {
    // Try to load from localStorage first
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsedVisible = JSON.parse(stored);
          // Ensure always-visible columns are included
          const storedSet = new Set([...parsedVisible, ...alwaysVisibleColumns]);
          // Only include columns that are actually available
          const filteredSet = new Set(
            Array.from(storedSet).filter(col => availableColumns.includes(col))
          );
          return filteredSet;
        }
      } catch (error) {
        console.warn("Failed to load column visibility from localStorage:", error);
      }
    }
    // Default: all columns visible
    return new Set(availableColumns);
  });

  // Update localStorage when visibility changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(visibleColumnSet)));
      } catch (error) {
        console.warn("Failed to save column visibility to localStorage:", error);
      }
    }
  }, [visibleColumnSet, storageKey]);

  // Update visible columns when available columns change
  useEffect(() => {
    setVisibleColumnSet(prevVisible => {
      const newVisible = new Set<string>();
      
      // Keep visible columns that are still available
      availableColumns.forEach(col => {
        if (prevVisible.has(col)) {
          newVisible.add(col);
        }
      });

      // Ensure always-visible columns are included
      alwaysVisibleColumns.forEach(col => {
        if (availableColumns.includes(col)) {
          newVisible.add(col);
        }
      });

      // If no columns would be visible (edge case), show all
      if (newVisible.size === 0) {
        return new Set(availableColumns);
      }

      return newVisible;
    });
  }, [availableColumns]);

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