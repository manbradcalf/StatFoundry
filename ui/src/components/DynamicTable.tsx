import React, { useState, useMemo } from "react";

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
    keys: [
      "rushing_yards",
      "rushing_tds",
      "rushing_first_downs",
      "carries",
      "rushing_epa",
      "rushing_fumbles",
      "rushing_fumbles_lost",
      "rushing_2pt_conversions",
    ],
    priority: 2,
  },
  {
    name: "passing",
    keys: [
      "passing_yards",
      "passing_tds",
      "passing_first_downs",
      "completions",
      "attempts",
      "interceptions",
      "sacks",
      "sack_yards",
      "passing_air_yards",
      "passing_yards_after_catch",
      "passing_2pt_conversions",
    ],
    priority: 3,
  },
  {
    name: "receiving",
    keys: [
      "receiving_yards",
      "receiving_tds",
      "receiving_first_downs",
      "targets",
      "receptions",
      "receiving_air_yards",
      "receiving_yards_after_catch",
      "receiving_epa",
      "receiving_fumbles",
      "receiving_fumbles_lost",
      "receiving_2pt_conversions",
      "air_yards_share",
      "target_share",
      "racr",
      "wopr",
    ],
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

export const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  excludeColumns = defaultExcludeColumns,
  columnGroups = defaultNFLGroups,
  customColumns = [],
  pageSize = 25,
  maxHeight = "600px",
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);

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

  if (processedData.length === 0) {
    return <div style={{ color: "#888", textAlign: "center" }}>No results</div>;
  }

  // Get all available keys from flattened data
  const allFlatKeys = Array.from(
    new Set(processedData.flatMap((item) => Object.keys(item.flattened)))
  );

  // Get array keys
  const arrayKeys = Array.from(
    new Set(processedData.flatMap((item) => Object.keys(item.arrays)))
  );

  // Filter out excluded columns
  const availableKeys = allFlatKeys.filter(
    (key) => !excludeColumns.includes(key)
  );

  // Prioritize key identifying fields for master rows
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

  // Pagination logic
  const totalPages = Math.ceil(processedData.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = processedData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setExpandedRows(new Set()); // Clear expanded rows when changing pages
  };

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const formatColumnHeader = (key: string): string => {
    return key
      .replace(/^[a-z]+\./, "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="dynamic-table-container">
      <div className="table-scroll-wrapper" style={{ maxHeight: maxHeight }}>
        <table className="dynamic-table">
          <thead>
            <tr>
              {arrayKeys.length > 0 && <th className="expand-column"></th>}
              {finalKeys.map((key) => (
                <th key={key}>{formatColumnHeader(key)}</th>
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
                          finalKeys.length + (arrayKeys.length > 0 ? 1 : 0)
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
            Showing {startIndex + 1}-{Math.min(endIndex, processedData.length)}{" "}
            of {processedData.length} results
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
