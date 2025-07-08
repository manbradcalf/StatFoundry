import { useState, useEffect } from "react";

interface UseRowExpansionProps {
  currentPage: number;
}

interface UseRowExpansionReturn {
  expandedRows: Set<number>;
  toggleRow: (index: number) => void;
  clearExpandedRows: () => void;
}

export const useRowExpansion = ({
  currentPage,
}: UseRowExpansionProps): UseRowExpansionReturn => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  /**
   * Toggle expansion state of a table row
   * @param index - The row index to toggle
   */
  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(index)) {
        newExpanded.delete(index);
      } else {
        newExpanded.add(index);
      }
      return newExpanded;
    });
  };

  /**
   * Clear all expanded rows
   */
  const clearExpandedRows = () => {
    setExpandedRows(new Set());
  };

  // Clear expanded rows when page changes
  useEffect(() => {
    clearExpandedRows();
  }, [currentPage]);

  return {
    expandedRows,
    toggleRow,
    clearExpandedRows,
  };
};
