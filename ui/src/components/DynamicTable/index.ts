// Main component
export { DynamicTable } from "./DynamicTable";
export { ExportButton } from "./components/ExportButton";

// Types
export type {
  DynamicTableProps,
  TableGroup,
  ProcessedDataItem,
  SortConfig,
} from "./types";

// Configuration
export { defaultNFLGroups } from "./config";

// Sub-components (if needed for external use)
export { TableHeader } from "./components/TableHeader";
export { TableBody } from "./components/TableBody";
export { PaginationControls } from "./components/PaginationControls";

// Hooks (if needed for external use)
export { useTableData } from "./hooks/useTableData";
export { useTableSorting } from "./hooks/useTableSorting";
export { useTablePagination } from "./hooks/useTablePagination";
