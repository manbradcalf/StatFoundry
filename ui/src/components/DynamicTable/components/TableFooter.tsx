import React from "react";
import {
  AggregationType,
  getAggregationLabel,
} from "./AggregationSelector";

interface TableFooterProps {
  columns: string[];
  aggregations: Record<string, number | null>;
  aggregationType: AggregationType;
}

export const TableFooter: React.FC<TableFooterProps> = ({
  columns,
  aggregations,
  aggregationType,
}) => {
  const label = getAggregationLabel(aggregationType);

  return (
    <tfoot>
      <tr style={{ fontWeight: "bold", borderTop: "2px solid #ddd" }}>
        {columns.map((column, index) => {
          const value = aggregations[column];
          return (
            <td key={column} className={index === 0 ? "first-column" : ""}>
              {value !== null ? (
                typeof value === "number" ? (
                  value.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })
                ) : (
                  value
                )
              ) : index === 0 ? (
                label
              ) : (
                ""
              )}
            </td>
          );
        })}
      </tr>
    </tfoot>
  );
};
