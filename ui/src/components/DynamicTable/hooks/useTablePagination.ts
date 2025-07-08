import { useState, useMemo } from "react";
import { ProcessedDataItem } from "../types";

interface UseTablePaginationProps {
  sortedData: ProcessedDataItem[];
  pageSize: number;
  onPageChange?: (page: number) => void;
}

interface UseTablePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  paginatedData: ProcessedDataItem[];
  goToPage: (page: number) => void;
  getPageRange: () => number[];
}

export const useTablePagination = ({
  sortedData,
  pageSize,
  onPageChange,
}: UseTablePaginationProps): UseTablePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(0);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  /**
   * Navigate to a specific page
   * @param page - The page number to navigate to
   */
  const goToPage = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  /**
   * Get the range of page numbers to display in pagination controls
   * Shows first page, last page, current page, and pages around current
   * @returns array of page numbers to display
   */
  const getPageRange = (): number[] => {
    return Array.from({ length: totalPages }, (_, i) => i).filter((page) => {
      // Show first page, last page, current page, and pages around current
      return (
        page === 0 ||
        page === totalPages - 1 ||
        Math.abs(page - currentPage) <= 2
      );
    });
  };

  // Reset to first page when sorted data changes (e.g., after sorting)
  const resetToFirstPage = () => {
    setCurrentPage(0);
  };

  // Auto-reset pagination when data changes significantly
  useMemo(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      resetToFirstPage();
    }
  }, [totalPages, currentPage]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedData,
    goToPage,
    getPageRange,
  };
};
