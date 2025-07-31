import { useState, useMemo } from "react";
import { SortConfig, ProcessedDataItem } from "../types";
import { compareValues } from "../../../utils/tableUtils";

interface UseTableSortingProps {
  processedData: ProcessedDataItem[];
  onSortChange?: () => void;
}

interface UseTableSortingReturn {
  sortConfig: SortConfig;
  sortedData: ProcessedDataItem[];
  handleSort: (key: string) => void;
  getSortIndicator: (key: string) => string;
}

export const useTableSorting = ({
  processedData,
  onSortChange,
}: UseTableSortingProps): UseTableSortingReturn => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  /**
   * Sort the processed data based on current sort configuration
   * This happens before pagination so we sort the entire dataset
   */
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return processedData;
    }

    return [...processedData].sort((a, b) => {
      let aValue, bValue;

      aValue = a.flattened[sortConfig.key!];
      bValue = b.flattened[sortConfig.key!];

      return compareValues(aValue, bValue, sortConfig.direction!);
    });
  }, [processedData, sortConfig]);

  /**
   * Handle column header clicks for sorting
   * @param key - The column key to sort by
   */
  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      // If clicking the same column, cycle through: asc -> desc -> null
      if (prevConfig.key === key) {
        if (prevConfig.direction === "asc") {
          return { key, direction: "desc" };
        } else if (prevConfig.direction === "desc") {
          return { key: null, direction: null };
        }
      }
      // If clicking a new column or no sort, start with ascending
      return { key, direction: "asc" };
    });

    // Notify parent of sort change (e.g., to reset pagination)
    if (onSortChange) {
      onSortChange();
    }
  };

  /**
   * Get sort indicator for a column header
   * @param key - The column key
   * @returns sort indicator string (arrow or empty)
   */
  const getSortIndicator = (key: string): string => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return {
    sortConfig,
    sortedData,
    handleSort,
    getSortIndicator,
  };
};
