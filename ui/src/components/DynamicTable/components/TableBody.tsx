import React from "react";
import { ProcessedDataItem, TableGroup } from "../types";
import { ExpandButton } from "./ExpandButton";
import { formatColumnHeader } from "../../../utils/tableUtils";
import { Link } from "react-router-dom";

interface TableBodyProps {
  paginatedData: ProcessedDataItem[];
  arrayKeys: string[];
  finalKeys: string[];
  expandedRows: Set<number>;
  startIndex: number;
  onToggleRow: (index: number) => void;
  getExpandableItemCount: (item: ProcessedDataItem) => number;
  excludeColumns: string[];
  columnGroups: TableGroup[];
  // For recursive rendering of nested tables
  DynamicTableComponent: React.ComponentType<any>;
}

export const TableBody: React.FC<TableBodyProps> = ({
  paginatedData,
  arrayKeys,
  finalKeys,
  expandedRows,
  startIndex,
  onToggleRow,
  getExpandableItemCount,
  excludeColumns,
  columnGroups,
  DynamicTableComponent,
}) => {

  return (
    <tbody>
      {paginatedData.map((item, index) => (
        <React.Fragment key={startIndex + index}>
          {/* Main row */}
          <tr>
            {arrayKeys.length > 0 && (
              <td className="expand-cell">
                <ExpandButton
                  isExpanded={expandedRows.has(index)}
                  onClick={() => onToggleRow(index)}
                  title={
                    arrayKeys.length > 0
                      ? `Expand to see ${arrayKeys.join(", ")}`
                      : "Expand"
                  }
                />
              </td>
            )}
            {arrayKeys.length > 0 && (
              <td className="count-cell">{getExpandableItemCount(item)}</td>
            )}
            {finalKeys.map((key) => (
              <td key={key}>
                <Link to={`/players/${String(item.flattened[key])}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                  {String(item.flattened[key] || "")}
                </Link>
              </td>
            ))}
          </tr>

          {/* Expanded rows with nested tables */}
          {expandedRows.has(index) &&
            arrayKeys.map((arrayKey) => (
              <tr
                key={`${startIndex + index}-${arrayKey}`}
                className="expanded-row"
              >
                <td colSpan={finalKeys.length + (arrayKeys.length > 0 ? 2 : 0)}>
                  <div className="nested-table-container">
                    <h4>{formatColumnHeader(arrayKey)}</h4>
                    <DynamicTableComponent
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
  );
};
