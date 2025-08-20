import { ColumnGroup } from "../types";

/**
 * Groups columns by their category for organized display in the visibility dropdown
 */
/**
 * Helper function to strip prefixes from column names for matching
 */
const stripPrefix = (columnName: string): string => {
  return columnName.replace(/^[a-z]+\./, '');
};

export const groupColumns = (availableColumns: string[], columnGroups: ColumnGroup[] = []): ColumnGroup[] => {
  // Debug logging
  console.log('=== Column Grouping Debug ===');
  console.log('Available columns:', availableColumns);
  console.log('Column groups:', columnGroups);
  
  // Create a map of stripped names to original names for matching
  const strippedToOriginal = new Map<string, string>();
  availableColumns.forEach(col => {
    const stripped = stripPrefix(col);
    strippedToOriginal.set(stripped, col);
  });
  
  // Filter and organize columns by their predefined groups
  const organizedGroups = columnGroups
    .map(group => {
      // Match group columns by their stripped names
      const matchedColumns = group.columns
        .map(groupCol => strippedToOriginal.get(groupCol))
        .filter((col): col is string => col !== undefined);
      
      console.log(`Group "${group.label}" expected:`, group.columns);
      console.log(`Group "${group.label}" matched:`, matchedColumns);
      
      return {
        ...group,
        columns: matchedColumns
      };
    })
    .filter(group => group.columns.length > 0) // Only include groups with available columns
    .sort((a, b) => a.priority - b.priority);

  // Find ungrouped columns (columns that don't belong to any predefined group)
  const groupedColumns = new Set(
    organizedGroups.flatMap(group => group.columns)
  );
  
  const ungroupedColumns = availableColumns.filter(col => !groupedColumns.has(col));
  
  console.log('Ungrouped columns (going to "Other"):', ungroupedColumns);
  console.log('=== End Column Grouping Debug ===');
  
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
export const getColumnGroup = (column: string, columnGroups: ColumnGroup[]): ColumnGroup | undefined => {
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