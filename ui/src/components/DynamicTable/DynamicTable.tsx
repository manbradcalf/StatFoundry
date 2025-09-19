import React from "react";
import { DynamicTableProps } from "./types";
import { defaultExcludeColumns } from "./config";
import { useTableData } from "./hooks/useTableData";
import { useTableSorting } from "./hooks/useTableSorting";
import { useTablePagination } from "./hooks/useTablePagination";
import { useColumnVisibility } from "./hooks/useColumnVisibility";
import { useColumnOrdering } from "./hooks/useColumnOrdering";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { PaginationControls } from "./components/PaginationControls";
import { ExportButton } from "./components/ExportButton";
import { ColumnVisibilityDropdown } from "./components/ColumnVisibilityDropdown";
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
  // Access control options
  requireAuthForExport = false,
  // Column grouping options
  columnGroups,
}) => {
  // Data processing hook - first get available columns
  const { availableColumns } = useTableData({
    data,
    columns,
    excludeColumns,
  });

  // Column visibility hook
  const columnVisibility = useColumnVisibility({
    availableColumns,
  });

  // Column ordering hook
  const columnOrdering = useColumnOrdering({
    availableColumns,
  });

  // Data processing with visibility filtering and column ordering
  const { processedData: visibleProcessedData, finalKeys: visibleFinalKeys } =
    useTableData({
      data,
      columns,
      excludeColumns,
      visibleColumns: columnVisibility.visibleColumns,
      columnOrder: columnOrdering.orderedColumns,
    });

  // Sorting hook
  const { sortConfig, sortedData, handleSort, getSortIndicator } =
    useTableSorting({
      processedData: visibleProcessedData,
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
  if (visibleProcessedData.length === 0) {
    return <div style={commonStyles.emptyState}>No results</div>;
  }

  return (
    <div className="dynamic-table-container">
      {/* Mobile-only text */}
      <div className="mobile-only-text">
        Scroll horizontally to see more columns
      </div>

      {/* Controls row with column visibility and export */}
      {(enableExport || availableColumns.length > 0) && (
        <div className="dynamic-table-controls">
          <ColumnVisibilityDropdown
            availableColumns={availableColumns}
            visibleColumns={columnVisibility.visibleColumns}
            isColumnVisible={columnVisibility.isColumnVisible}
            toggleColumn={columnVisibility.toggleColumn}
            toggleGroup={columnVisibility.toggleGroup}
            showAllColumns={columnVisibility.showAllColumns}
            hideAllNonEssential={columnVisibility.hideAllNonEssential}
            resetToDefaults={columnVisibility.resetToDefaults}
            canHideColumn={columnVisibility.canHideColumn}
            columnGroups={columnGroups}
            hasCustomOrder={columnOrdering.hasCustomOrder}
            resetColumnOrder={columnOrdering.resetColumnOrder}
          />
          {enableExport && (
            <ExportButton
              data={sortedData}
              columns={visibleFinalKeys}
              filename={exportFilename}
              onExport={onExport}
              requireAuth={requireAuthForExport}
            />
          )}
        </div>
      )}

      <div className="table-scroll-wrapper" style={{ maxHeight: maxHeight }}>
        <table className="dynamic-table">
          <TableHeader
            finalKeys={visibleFinalKeys}
            sortConfig={sortConfig}
            onSort={handleSort}
            getSortIndicator={getSortIndicator}
            onReorderColumns={columnOrdering.reorderColumns}
            orderedColumns={columnOrdering.orderedColumns}
          />
          <TableBody
            paginatedData={paginatedData}
            finalKeys={visibleFinalKeys}
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
