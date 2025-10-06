import { useMemo } from "react";
import { ProcessedDataItem } from "../types";

const useColumnAggregation = (
  data: ProcessedDataItem[],
  columns: string[],
  aggregationType: "sum" | "avg" | "min" | "max" | "custom" = "sum",
  customAggregation?: (acc: number, val: number) => number
) => {
  return useMemo(() => {
    const aggregations: Record<string, number | null> = {};

    columns.forEach((column) => {
      const numericValues = data
        .map((item) => item.processed[column])
        .filter((val) => typeof val === "number" && !isNaN(val));

      if (numericValues.length > 0) {
        switch (aggregationType) {
          case "sum":
            aggregations[column] = numericValues.reduce(
              (acc, val) => acc + val,
              0
            );
            break;
          case "avg":
            aggregations[column] =
              numericValues.reduce((acc, val) => acc + val, 0) /
              numericValues.length;
            break;
          case "min":
            aggregations[column] = Math.min(...numericValues);
            break;
          case "max":
            aggregations[column] = Math.max(...numericValues);
            break;
          case "custom":
            aggregations[column] = customAggregation
              ? numericValues.reduce(customAggregation, 0)
              : null;
            break;
        }
      } else {
        aggregations[column] = null;
      }
    });
    return aggregations;
  }, [data, columns, aggregationType, customAggregation]);
};

export { useColumnAggregation };
