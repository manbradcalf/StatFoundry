import React, { useState } from "react";
import {SortConfig } from "../types";
import { formatColumnHeader } from "../../../utils/tableUtils";

interface TableHeaderProps {
  finalKeys: string[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  getSortIndicator: (key: string) => string;
  onReorderColumns?: (fromIndex: number, toIndex: number) => void;
  orderedColumns?: string[];
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  finalKeys,
  sortConfig,
  onSort,
  getSortIndicator,
  onReorderColumns,
  orderedColumns,
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

    if (draggedIndex !== null && draggedIndex !== dropIndex && onReorderColumns && orderedColumns) {
      // Map visible column indices to their actual positions in orderedColumns
      const fromColumn = finalKeys[draggedIndex];
      const toColumn = finalKeys[dropIndex];
      const actualFromIndex = orderedColumns.indexOf(fromColumn);
      const actualToIndex = orderedColumns.indexOf(toColumn);

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
        {finalKeys.map((key, index) => (
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
