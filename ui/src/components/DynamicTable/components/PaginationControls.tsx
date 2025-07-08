import React from "react";
import { SortConfig } from "../types";
import { formatColumnHeader } from "../../../utils/tableUtils";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalResults: number;
  sortConfig: SortConfig;
  onGoToPage: (page: number) => void;
  getPageRange: () => number[];
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalResults,
  sortConfig,
  onGoToPage,
  getPageRange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageRange = getPageRange();

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of{" "}
        {totalResults} results
        {sortConfig.key && (
          <span className="sort-info">
            {" • Sorted by " + formatColumnHeader(sortConfig.key)}
            {sortConfig.direction === "asc" ? " ↑" : " ↓"}
          </span>
        )}
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => onGoToPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        {/* Page numbers */}
        {pageRange.map((page, index, array) => {
          const prevPage = array[index - 1];
          const showEllipsis = prevPage !== undefined && page - prevPage > 1;

          return (
            <React.Fragment key={page}>
              {showEllipsis && <span className="pagination-ellipsis">...</span>}
              <button
                className={`pagination-button ${
                  page === currentPage ? "active" : ""
                }`}
                onClick={() => onGoToPage(page)}
              >
                {page + 1}
              </button>
            </React.Fragment>
          );
        })}

        <button
          className="pagination-button"
          onClick={() => onGoToPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
