import React from "react";
import {SortConfig } from "../types";
import { formatColumnHeader } from "../../../utils/tableUtils";

interface TableHeaderProps {
  finalKeys: string[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  getSortIndicator: (key: string) => string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  finalKeys,
  sortConfig,
  onSort,
  getSortIndicator,
}) => {
  return (
    <thead>
      <tr>
        {finalKeys.map((key, index) => (
          <th
            key={key}
            onClick={() => onSort(key)}
            className={`sortable-header ${sortConfig.key === key ? "sorted" : ""} ${index === 0 ? "first-column" : ""}`}
            title={`Click to sort by ${formatColumnHeader(key)}`}
          >
            {formatColumnHeader(key)}
            {getSortIndicator(key)}
          </th>
        ))}
      </tr>
    </thead>
  );
};
