import { useState, useCallback, useMemo } from "react";

interface UseColumnOrderingProps {
  availableColumns: string[];
}

interface UseColumnOrderingReturn {
  orderedColumns: string[];
  reorderColumns: (fromIndex: number, toIndex: number) => void;
  reorderColumnsByName: (fromColumn: string, toColumn: string) => void;
  resetColumnOrder: () => void;
  hasCustomOrder: boolean;
}

/**
 * Hook for managing column ordering state with drag-and-drop support
 */
export const useColumnOrdering = ({
  availableColumns,
}: UseColumnOrderingProps): UseColumnOrderingReturn => {
  // Track custom column order - null means use default order
  const [customOrder, setCustomOrder] = useState<string[] | null>(null);

  // Determine the current ordered columns
  const orderedColumns = useMemo(() => {
    if (customOrder) {
      // Filter out any columns that are no longer available and add any new ones
      const filteredCustomOrder = customOrder.filter(col => availableColumns.includes(col));
      const newColumns = availableColumns.filter(col => !customOrder.includes(col));
      return [...filteredCustomOrder, ...newColumns];
    }
    return availableColumns;
  }, [customOrder, availableColumns]);

  // Check if we have a custom order
  const hasCustomOrder = customOrder !== null;

  // Reorder columns by moving from one index to another
  const reorderColumns = useCallback((fromIndex: number, toIndex: number) => {
    const currentOrder = customOrder || [...availableColumns];

    if (fromIndex === toIndex) return;
    if (fromIndex < 0 || fromIndex >= currentOrder.length) return;
    if (toIndex < 0 || toIndex >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    const [movedColumn] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedColumn);

    setCustomOrder(newOrder);
  }, [customOrder, availableColumns]);

  // Reorder columns by column names (works with filtered visible columns)
  const reorderColumnsByName = useCallback((fromColumn: string, toColumn: string) => {
    const currentOrder = customOrder || [...availableColumns];

    const fromIndex = currentOrder.indexOf(fromColumn);
    const toIndex = currentOrder.indexOf(toColumn);

    if (fromIndex === -1 || toIndex === -1) return;
    if (fromIndex === toIndex) return;

    const newOrder = [...currentOrder];
    const [movedColumn] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedColumn);

    setCustomOrder(newOrder);
  }, [customOrder, availableColumns]);

  // Reset to default column order
  const resetColumnOrder = useCallback(() => {
    setCustomOrder(null);
  }, []);

  return {
    orderedColumns,
    reorderColumns,
    reorderColumnsByName,
    resetColumnOrder,
    hasCustomOrder,
  };
};