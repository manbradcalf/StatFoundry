export interface TableColumn {
  key: string;
  label: string;
  group?: string;
}

export interface TableGroup {
  name: string;
  keys: string[];
  priority: number;
}

export interface DynamicTableProps {
  data: any[];
  columns?: string[]; // Explicit column order - if not provided, show all available columns
  excludeColumns?: string[];
  pageSize?: number;
  maxHeight?: string;
  // Export options
  enableExport?: boolean;
  exportFilename?: string;
  onExport?: () => void;
  // Access control options
  requireAuthForExport?: boolean;
  // Column grouping options
  columnGroups?: ColumnGroup[];
  // Aggregation options
  enableAggregations?: boolean;
  aggregationType?: "sum" | "avg" | "min" | "max" | "custom";
  customAggregation?: (acc: number, val: number) => number;
}

/**
 * Sort configuration interface
 * - key: The column key to sort by
 * - direction: Sort direction ('asc' for ascending, 'desc' for descending, null for no sort)
 */
export interface SortConfig {
  key: string | null;
  direction: "asc" | "desc" | null;
}

// TODO: Is this still needed? we dont handle nested rows anymore
/**
 * Processed data item interface
 * Represents the structure after flattening nested objects and separating arrays
 */
export interface ProcessedDataItem {
  processed: Record<string, any>;
}

/**
 * Column visibility configuration
 */
export interface ColumnVisibilityState {
  visibleColumns: Set<string>;
  hiddenColumns: Set<string>;
}

/**
 * Column group for organizing columns in visibility dropdown
 */
export interface ColumnGroup {
  name: string;
  label: string;
  columns: string[];
  priority: number;
}
