import React from "react";

export type AggregationType = "sum" | "avg" | "min" | "max" | "custom";

interface AggregationSelectorProps {
  aggregationType: AggregationType;
  onAggregationTypeChange: (type: AggregationType) => void;
}

export const aggregationOptions = [
  { value: "sum", label: "Total" },
  { value: "avg", label: "Average" },
  { value: "min", label: "Minimum" },
  { value: "max", label: "Maximum" },
] as const;

export const getAggregationLabel = (type: AggregationType): string =>
  aggregationOptions.find((opt) => opt.value === type)?.label || "Total";

export const AggregationSelector: React.FC<AggregationSelectorProps> = ({
  aggregationType,
  onAggregationTypeChange,
}) => {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.9rem",
      }}
    >
      <span>Aggregate:</span>
      <select
        value={aggregationType}
        onChange={(e) =>
          onAggregationTypeChange(e.target.value as AggregationType)
        }
        style={{
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
    </label>
  );
};
