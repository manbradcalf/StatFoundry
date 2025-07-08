// Main component
export { DynamicTable } from "./DynamicTable";

// Types
export type {
  TableColumn,
  TableGroup,
  DynamicTableProps,
  SortConfig,
  ProcessedDataItem,
} from "./types";

// Configuration
export {
  defaultNFLGroups,
  defaultExcludeColumns,
  identifyingFields,
} from "./config";

// Sub-components (if needed for external use)
export { ExpandButton } from "./components/ExpandButton";
export { TableHeader } from "./components/TableHeader";
export { TableBody } from "./components/TableBody";
export { PaginationControls } from "./components/PaginationControls";

// Hooks (if needed for external use)
export { useTableData } from "./hooks/useTableData";
export { useTableSorting } from "./hooks/useTableSorting";
export { useTablePagination } from "./hooks/useTablePagination";
export { useRowExpansion } from "./hooks/useRowExpansion";
