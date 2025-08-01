import React from "react";
import { DynamicTableProps } from "./types";
import { defaultExcludeColumns } from "./config";
import { useTableData } from "./hooks/useTableData";
import { useTableSorting } from "./hooks/useTableSorting";
import { useTablePagination } from "./hooks/useTablePagination";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { PaginationControls } from "./components/PaginationControls";
import { ExportButton } from "./components/ExportButton";
import { commonStyles } from "../../utils/commonStyles";

export const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  columns,
  excludeColumns = defaultExcludeColumns,
  pageSize = 25,
  maxHeight = "600px",
  // Export options
  enableExport = false,
  exportFilename,
  onExport,
}) => {
  // Data processing hook
  const { processedData, arrayKeys, finalKeys } = useTableData({
    data,
    columns,
    excludeColumns,
  });

  // Sorting hook
  const { sortConfig, sortedData, handleSort, getSortIndicator } =
    useTableSorting({
      processedData,
      onSortChange: () => {
        // This will be handled by the pagination hook's auto-reset
      },
    });

  // Pagination hook
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedData,
    goToPage,
    getPageRange,
  } = useTablePagination({
    sortedData,
    pageSize,
  });

  // Early return if no data
  if (processedData.length === 0) {
    return <div style={commonStyles.emptyState}>No results</div>;
  }

  return (
    <div className="dynamic-table-container">
      {/* Mobile-only text */}
      <div className="mobile-only-text">
        Scroll horizontally to see more columns
      </div>

      {/* Conditionally render export button */}
      {enableExport && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "12px",
          }}
        >
          <ExportButton
            data={sortedData}
            columns={finalKeys}
            filename={exportFilename}
            onExport={onExport}
          />
        </div>
      )}

      <div className="table-scroll-wrapper" style={{ maxHeight: maxHeight }}>
        <table className="dynamic-table">
          <TableHeader
            finalKeys={finalKeys}
            sortConfig={sortConfig}
            onSort={handleSort}
            getSortIndicator={getSortIndicator}
          />
          <TableBody
            paginatedData={paginatedData}
            arrayKeys={arrayKeys}
            finalKeys={finalKeys}
            startIndex={startIndex}
            excludeColumns={excludeColumns}
          />
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalResults={sortedData.length}
        sortConfig={sortConfig}
        onGoToPage={goToPage}
        getPageRange={getPageRange}
      />
    </div>
  );
};
