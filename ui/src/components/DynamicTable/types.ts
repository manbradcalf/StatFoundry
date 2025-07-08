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
  excludeColumns?: string[];
  columnGroups?: TableGroup[];
  customColumns?: TableColumn[];
  pageSize?: number;
  maxHeight?: string;
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
