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

/**
 * Processed data item interface
 * Represents the structure after flattening nested objects and separating arrays
 */
export interface ProcessedDataItem {
  flattened: Record<string, any>;
  arrays: Record<string, any[]>;
}
