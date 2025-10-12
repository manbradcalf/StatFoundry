import React from "react";

interface TableFooterProps {
  columns: string[];
  aggregations: Record<string, number | null>;
  aggregationType: "sum" | "avg" | "min" | "max" | "custom";
  onAggregationTypeChange: (
    type: "sum" | "avg" | "min" | "max" | "custom",
  ) => void;
}

export const TableFooter: React.FC<TableFooterProps> = ({
  columns,
  aggregations,
  aggregationType,
  onAggregationTypeChange,
}) => {
  const aggregationOptions = [
    { value: "sum", label: "Total" },
    { value: "avg", label: "Average" },
    { value: "min", label: "Minimum" },
    { value: "max", label: "Maximum" },
  ] as const;

  // TODO: Uncomment when ready for aggregation
  // const getCurrentLabel = () => {
  //   const option = aggregationOptions.find(
  //     (opt) => opt.value === aggregationType,
  //   );
  //   return option?.label || "Total";
  // };

  return (
    <tfoot>
      <tr style={{ fontWeight: "bold", borderTop: "2px solid #ddd" }}>
        {columns.map((column, index) => {
          const value = aggregations[column];
          return (
            <td key={column} className={index === 0 ? "first-column" : ""}>
              {index === 0 && value === null ? (
                <select
                  value={aggregationType}
                  onChange={(e) =>
                    onAggregationTypeChange(e.target.value as any)
                  }
                  style={{
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  {aggregationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : value !== null ? (
                typeof value === "number" ? (
                  value.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })
                ) : (
                  value
                )
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
