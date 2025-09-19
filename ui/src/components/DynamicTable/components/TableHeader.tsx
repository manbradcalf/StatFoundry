import React, { useState } from "react";
import {SortConfig } from "../types";
import { formatColumnHeader } from "../../../utils/tableUtils";

interface TableHeaderProps {
  displayedColumns: string[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  getSortIndicator: (key: string) => string;
  onReorderColumns?: (fromIndex: number, toIndex: number) => void;
  allColumns?: string[];
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  displayedColumns,
  sortConfig,
  onSort,
  getSortIndicator,
  onReorderColumns,
  allColumns,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex !== null && draggedIndex !== dropIndex && onReorderColumns && allColumns) {
      // Map visible column indices to their actual positions in allColumns
      const fromColumn = displayedColumns[draggedIndex];
      const toColumn = displayedColumns[dropIndex];
      const actualFromIndex = allColumns.indexOf(fromColumn);
      const actualToIndex = allColumns.indexOf(toColumn);

      if (actualFromIndex !== -1 && actualToIndex !== -1) {
        onReorderColumns(actualFromIndex, actualToIndex);
      }
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };
  return (
    <thead>
      <tr>
        {displayedColumns.map((key, index) => (
          <th
            key={key}
            draggable={!!onReorderColumns}
            onClick={() => onSort(key)}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`sortable-header ${sortConfig.key === key ? "sorted" : ""} ${index === 0 ? "first-column" : ""} ${
              onReorderColumns ? "draggable" : ""
            } ${draggedIndex === index ? "dragging" : ""} ${
              dragOverIndex === index && draggedIndex !== index ? "drag-over" : ""
            }`}
            title={
              onReorderColumns
                ? `Click to sort by ${formatColumnHeader(key)}. Drag to reorder columns.`
                : `Click to sort by ${formatColumnHeader(key)}`
            }
          >
            {formatColumnHeader(key)}
            {getSortIndicator(key)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
