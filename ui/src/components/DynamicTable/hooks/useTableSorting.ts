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
  getExpandableItemCount: (item: ProcessedDataItem) => number;
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
   * Get the total count of expandable items for a row
   * @param item - The processed data item
   * @returns total count of items across all arrays
   */
  const getExpandableItemCount = (item: ProcessedDataItem): number => {
    return Object.values(item.arrays).reduce((total: number, arr: any) => {
      return total + (Array.isArray(arr) ? arr.length : 0);
    }, 0);
  };

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

      // Handle special case for expandable count sorting
      if (sortConfig.key === "__expandable_count__") {
        aValue = getExpandableItemCount(a);
        bValue = getExpandableItemCount(b);
      } else {
        aValue = a.flattened[sortConfig.key!];
        bValue = b.flattened[sortConfig.key!];
      }

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
    getExpandableItemCount,
  };
};
