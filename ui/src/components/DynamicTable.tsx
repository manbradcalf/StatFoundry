import React, { useState, useMemo } from "react";
import { PASSING_STATS } from "../feature/Chunks/Views/PassingStats";
import { RUSHING_STATS } from "../feature/Chunks/Views/RushingStats";
import { RECEIVING_STATS } from "../feature/Chunks/Views/ReceivingStats";

interface TableColumn {
  key: string;
  label: string;
  group?: string;
}

interface TableGroup {
  name: string;
  keys: string[];
  priority: number;
}

interface DynamicTableProps {
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
interface SortConfig {
  key: string | null;
  direction: "asc" | "desc" | null;
}

// Default NFL stats grouping
const defaultNFLGroups: TableGroup[] = [
  {
    name: "player",
    keys: [
      "player_display_name",
      "display_name",
      "position",
      "position_group",
      "recent_team",
    ],
    priority: 1,
  },
  {
    name: "rushing",
    keys: [...RUSHING_STATS],
    priority: 2,
  },
  {
    name: "passing",
    keys: [...PASSING_STATS],
    priority: 3,
  },
  {
    name: "receiving",
    keys: [...RECEIVING_STATS],
    priority: 4,
  },
  {
    name: "fantasy",
    keys: ["fantasy_points", "fantasy_points_ppr"],
    priority: 5,
  },
  {
    name: "game",
    keys: [
      "opponent_team",
      "won",
      "season",
      "week",
      "season_type",
      "game_id",
      "player_game_id",
      "player_id",
    ],
    priority: 6,
  },
];

const defaultExcludeColumns = ["headshot_url", "player_name"];

// Key identifying fields that should always be shown in master rows
const identifyingFields = [
  "player_display_name",
  "display_name",
  "position",
  "recent_team",
  "season",
  "week",
];

/**
 * Utility function to determine if a value is numeric
 * @param value - The value to check
 * @returns true if the value can be treated as a number
 */
const isNumeric = (value: any): boolean => {
  if (value === null || value === undefined || value === "") return false;
  return !isNaN(Number(value)) && isFinite(Number(value));
};

/**
 * Comparison function for sorting two values
 * Prioritizes numeric comparison over string comparison
 * @param a - First value to compare
 * @param b - Second value to compare
 * @param direction - Sort direction ('asc' or 'desc')
 * @returns comparison result (-1, 0, 1)
 */
const compareValues = (a: any, b: any, direction: "asc" | "desc"): number => {
  // Handle null/undefined values - always put them at the end
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  // Convert to strings for comparison
  const aStr = String(a).trim();
  const bStr = String(b).trim();

  // If both values are numeric, compare as numbers
  if (isNumeric(aStr) && isNumeric(bStr)) {
    const aNum = Number(aStr);
    const bNum = Number(bStr);
    const result = aNum - bNum;
    return direction === "asc" ? result : -result;
  }

  // Fall back to string comparison (case-insensitive)
  const result = aStr.toLowerCase().localeCompare(bStr.toLowerCase());
  return direction === "asc" ? result : -result;
};

export const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  excludeColumns = defaultExcludeColumns,
  columnGroups = defaultNFLGroups,
  customColumns = [],
  pageSize = 25,
  maxHeight = "600px",
}) => {
  // State for tracking expanded rows
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);

  // State for column sorting
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  // Flatten nested objects and separate array data
  const processedData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item) => {
      const flattened: any = {};
      const arrays: any = {};

      const flattenObject = (obj: any, prefix = "") => {
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          const newKey = prefix ? `${prefix}.${key}` : key;

          if (Array.isArray(value)) {
            arrays[newKey] = value;
          } else if (value && typeof value === "object") {
            flattenObject(value, newKey);
          } else {
            flattened[newKey] = value;
          }
        });
      };

      flattenObject(item);
      return { flattened, arrays };
    });
  }, [data]);

  // Get all available keys from flattened data
  const allFlatKeys = useMemo(() => {
    return Array.from(
      new Set(processedData.flatMap((item) => Object.keys(item.flattened)))
    );
  }, [processedData]);

  // Get array keys
  const arrayKeys = useMemo(() => {
    return Array.from(
      new Set(processedData.flatMap((item) => Object.keys(item.arrays)))
    );
  }, [processedData]);

  // Filter out excluded columns
  const availableKeys = useMemo(() => {
    return allFlatKeys.filter((key) => !excludeColumns.includes(key));
  }, [allFlatKeys, excludeColumns]);

  // Prioritize key identifying fields for master rows
  const { finalKeys } = useMemo(() => {
    const identifyingKeysPresent = identifyingFields.filter((key) =>
      availableKeys.includes(key)
    );
    const remainingKeys = availableKeys.filter(
      (key) => !identifyingFields.includes(key)
    );

    // Group remaining columns by category
    const groupedKeys: string[] = [];
    const usedKeys = new Set<string>(identifyingKeysPresent);

    // Sort groups by priority and add their keys
    columnGroups
      .sort((a, b) => a.priority - b.priority)
      .forEach((group) => {
        const groupKeys = group.keys.filter(
          (key) => availableKeys.includes(key) && !usedKeys.has(key)
        );
        groupKeys.forEach((key) => usedKeys.add(key));
        groupedKeys.push(...groupKeys);
      });

    // Add any remaining uncategorized keys
    const uncategorizedKeys = remainingKeys.filter((key) => !usedKeys.has(key));

    // Final column order: identifying fields first, then grouped fields, then uncategorized
    const finalKeys = [
      ...identifyingKeysPresent,
      ...groupedKeys,
      ...uncategorizedKeys,
    ];

    return { finalKeys };
  }, [availableKeys, columnGroups]);

  /**
   * Sort the processed data based on current sort configuration
   * This happens before pagination so we sort the entire dataset
   */
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return processedData;
    }

    return [...processedData].sort((a, b) => {
      let aValue, bValue;

      // Handle special case for expandable count sorting
      if (sortConfig.key === "__expandable_count__") {
        aValue = getExpandableItemCount(a);
        bValue = getExpandableItemCount(b);
      } else {
        aValue = a.flattened[sortConfig.key!];
        bValue = b.flattened[sortConfig.key!];
      }

      return compareValues(aValue, bValue, sortConfig.direction!);
    });
  }, [processedData, sortConfig]);

  // Pagination logic - applied to sorted data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Early return after all hooks are called
  if (processedData.length === 0) {
    return <div style={{ color: "#888", textAlign: "center" }}>No results</div>;
  }

  /**
   * Handle column header clicks for sorting
   * @param key - The column key to sort by
   */
  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      // If clicking the same column, cycle through: asc -> desc -> null
      if (prevConfig.key === key) {
        if (prevConfig.direction === "asc") {
          return { key, direction: "desc" };
        } else if (prevConfig.direction === "desc") {
          return { key: null, direction: null };
        }
      }
      // If clicking a new column or no sort, start with ascending
      return { key, direction: "asc" };
    });

    // Reset to first page when sorting changes
    setCurrentPage(0);
  };

  /**
   * Navigate to a specific page
   * @param page - The page number to navigate to
   */
  const goToPage = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set()); // Clear expanded rows when changing pages
  };

  /**
   * Toggle expansion state of a table row
   * @param index - The row index to toggle
   */
  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  /**
   * Format column header text for display
   * @param key - The column key
   * @returns formatted header text
   */
  const formatColumnHeader = (key: string): string => {
    return key
      .replace(/^[a-z]+\./, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  /**
   * Get sort indicator for a column header
   * @param key - The column key
   * @returns sort indicator string (arrow or empty)
   */
  const getSortIndicator = (key: string): string => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  /**
   * Get the total count of expandable items for a row
   * @param item - The processed data item
   * @returns total count of items across all arrays
   */
  const getExpandableItemCount = (item: any): number => {
    return Object.values(item.arrays).reduce((total: number, arr: any) => {
      return total + (Array.isArray(arr) ? arr.length : 0);
    }, 0);
  };

  return (
    <div className="dynamic-table-container">
      <div className="table-scroll-wrapper" style={{ maxHeight: maxHeight }}>
        <table className="dynamic-table">
          <thead>
            <tr>
              {arrayKeys.length > 0 && <th className="expand-column"></th>}
              {arrayKeys.length > 0 && (
                <th
                  className={`count-column sortable-header ${sortConfig.key === "__expandable_count__" ? "sorted" : ""}`}
                  onClick={() => handleSort("__expandable_count__")}
                  title="Click to sort by number of games"
                >
                  Games{getSortIndicator("__expandable_count__")}
                </th>
              )}
              {finalKeys.map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`sortable-header ${sortConfig.key === key ? "sorted" : ""}`}
                  title={`Click to sort by ${formatColumnHeader(key)}`}
                >
                  {formatColumnHeader(key)}
                  {getSortIndicator(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <React.Fragment key={startIndex + index}>
                <tr>
                  {arrayKeys.length > 0 && (
                    <td className="expand-cell">
                      <button
                        className="expand-button"
                        onClick={() => toggleRow(index)}
                        title={
                          arrayKeys.length > 0
                            ? `Expand to see ${arrayKeys.join(", ")}`
                            : "Expand"
                        }
                      >
                        {expandedRows.has(index) ? "▼" : "▶"}
                      </button>
                    </td>
                  )}
                  {arrayKeys.length > 0 && (
                    <td className="count-cell">
                      {getExpandableItemCount(item)}
                    </td>
                  )}
                  {finalKeys.map((key) => (
                    <td key={key}>{String(item.flattened[key] || "")}</td>
                  ))}
                </tr>
                {expandedRows.has(index) &&
                  arrayKeys.map((arrayKey) => (
                    <tr
                      key={`${startIndex + index}-${arrayKey}`}
                      className="expanded-row"
                    >
                      <td
                        colSpan={
                          finalKeys.length + (arrayKeys.length > 0 ? 2 : 0)
                        }
                      >
                        <div className="nested-table-container">
                          <h4>{formatColumnHeader(arrayKey)}</h4>
                          <DynamicTable
                            data={item.arrays[arrayKey]}
                            excludeColumns={excludeColumns}
                            columnGroups={columnGroups}
                            pageSize={10}
                            maxHeight="400px"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1}-{Math.min(endIndex, sortedData.length)} of{" "}
            {sortedData.length} results
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
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i)
              .filter((page) => {
                // Show first page, last page, current page, and pages around current
                return (
                  page === 0 ||
                  page === totalPages - 1 ||
                  Math.abs(page - currentPage) <= 2
                );
              })
              .map((page, index, array) => {
                const prevPage = array[index - 1];
                const showEllipsis =
                  prevPage !== undefined && page - prevPage > 1;

                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <span className="pagination-ellipsis">...</span>
                    )}
                    <button
                      className={`pagination-button ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => goToPage(page)}
                    >
                      {page + 1}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              className="pagination-button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export types for reuse
export type { TableColumn, TableGroup, DynamicTableProps };
export { defaultNFLGroups, defaultExcludeColumns };
