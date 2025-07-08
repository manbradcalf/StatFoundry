import React from "react";
import { DynamicTableProps } from "./types";
import { defaultNFLGroups, defaultExcludeColumns } from "./config";
import { useTableData } from "./hooks/useTableData";
import { useTableSorting } from "./hooks/useTableSorting";
import { useTablePagination } from "./hooks/useTablePagination";
import { useRowExpansion } from "./hooks/useRowExpansion";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";
import { PaginationControls } from "./components/PaginationControls";

export const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  excludeColumns = defaultExcludeColumns,
  columnGroups = defaultNFLGroups,
  customColumns = [],
  pageSize = 25,
  maxHeight = "600px",
}) => {
  // Data processing hook
  const { processedData, arrayKeys, finalKeys } = useTableData({
    data,
    excludeColumns,
    columnGroups,
  });

  // Sorting hook
  const {
    sortConfig,
    sortedData,
    handleSort,
    getSortIndicator,
    getExpandableItemCount,
  } = useTableSorting({
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

  // Row expansion hook
  const { expandedRows, toggleRow } = useRowExpansion({
    currentPage,
  });

  // Early return if no data
  if (processedData.length === 0) {
    return <div style={{ color: "#888", textAlign: "center" }}>No results</div>;
  }

  return (
    <div className="dynamic-table-container">
      <div className="table-scroll-wrapper" style={{ maxHeight: maxHeight }}>
        <table className="dynamic-table">
          <TableHeader
            arrayKeys={arrayKeys}
            finalKeys={finalKeys}
            sortConfig={sortConfig}
            onSort={handleSort}
            getSortIndicator={getSortIndicator}
          />
          <TableBody
            paginatedData={paginatedData}
            arrayKeys={arrayKeys}
            finalKeys={finalKeys}
            expandedRows={expandedRows}
            startIndex={startIndex}
            onToggleRow={toggleRow}
            getExpandableItemCount={getExpandableItemCount}
            excludeColumns={excludeColumns}
            columnGroups={columnGroups}
            DynamicTableComponent={DynamicTable}
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
