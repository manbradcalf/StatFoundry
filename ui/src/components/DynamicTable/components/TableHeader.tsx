import React from "react";
import { SortConfig } from "../types";
import { formatColumnHeader } from "../../../utils/tableUtils";

interface TableHeaderProps {
  arrayKeys: string[];
  finalKeys: string[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  getSortIndicator: (key: string) => string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  arrayKeys,
  finalKeys,
  sortConfig,
  onSort,
  getSortIndicator,
}) => {
  return (
    < thead >
      <tr>
        {arrayKeys.length > 0 && <th className="expand-column"></th>}
        {arrayKeys.length > 0 && (
          <th
            className={`count-column sortable-header ${sortConfig.key === "__expandable_count__" ? "sorted" : ""
              }`}
            onClick={() => onSort("__expandable_count__")}
            title="Click to sort by number of games"
          >
            {arrayKeys}{getSortIndicator("__expandable_count__")}
          </th>
        )}
        {finalKeys.map((key) => (
          <th
            key={key}
            onClick={() => onSort(key)}
            className={`sortable-header ${sortConfig.key === key ? "sorted" : ""
              }`}
            title={`Click to sort by ${formatColumnHeader(key)}`}
          >
            {formatColumnHeader(key)}
            {getSortIndicator(key)}
          </th>
        ))}
      </tr>
    </thead >
  );
};
