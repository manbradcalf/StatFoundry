import { ColumnGroup } from "../types";
import { columnGroups } from "../config";

/**
 * Groups columns by their category for organized display in the visibility dropdown
 */
export const groupColumns = (availableColumns: string[]): ColumnGroup[] => {
  // Create a set of available columns for faster lookup
  const availableSet = new Set(availableColumns);
  
  // Filter and organize columns by their predefined groups
  const organizedGroups = columnGroups
    .map(group => ({
      ...group,
      columns: group.columns.filter(col => availableSet.has(col))
    }))
    .filter(group => group.columns.length > 0) // Only include groups with available columns
    .sort((a, b) => a.priority - b.priority);

  // Find ungrouped columns (columns that don't belong to any predefined group)
  const groupedColumns = new Set(
    organizedGroups.flatMap(group => group.columns)
  );
  
  const ungroupedColumns = availableColumns.filter(col => !groupedColumns.has(col));
  
  // Add ungrouped columns to a separate "Other" group if any exist
  if (ungroupedColumns.length > 0) {
    organizedGroups.push({
      name: "other",
      label: "Other",
      columns: ungroupedColumns.sort(),
      priority: 999,
    });
  }

  return organizedGroups;
};

/**
 * Gets the group that contains the specified column
 */
export const getColumnGroup = (column: string): ColumnGroup | undefined => {
  return columnGroups.find(group => group.columns.includes(column));
};

/**
 * Checks if columns from the same group should be shown/hidden together
 */
export const getGroupToggleState = (
  groupColumns: string[], 
  visibleColumns: Set<string>
): "all" | "none" | "partial" => {
  const visibleCount = groupColumns.filter(col => visibleColumns.has(col)).length;
  
  if (visibleCount === 0) return "none";
  if (visibleCount === groupColumns.length) return "all";
  return "partial";
};