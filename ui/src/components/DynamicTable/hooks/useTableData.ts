import { useMemo } from "react";
import { ProcessedDataItem } from "../types";

interface UseTableDataProps {
  data: any[];
  columns?: string[];
  excludeColumns: string[];
}

interface UseTableDataReturn {
  processedData: ProcessedDataItem[];
  arrayKeys: string[];
  finalKeys: string[];
}

export const useTableData = ({
  data,
  columns,
  excludeColumns,
}: UseTableDataProps): UseTableDataReturn => {
  // Flatten nested objects and separate array data
  const flattenedData = useMemo(() => {
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
            // Convert arrays of primitives to objects with meaningful keys
            const processedArray = value.map((item, index) => {
              if (
                typeof item === "string" ||
                typeof item === "number" ||
                typeof item === "boolean" ||
                item === null
              ) {
                return { value: item, index: index };
              }
              return item;
            });
            arrays[newKey] = processedArray;
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

  // Get array keys
  const arrayKeys = useMemo(() => {
    return Array.from(
      new Set(flattenedData.flatMap((item) => Object.keys(item.arrays)))
    );
  }, [flattenedData]);

  // Determine final columns to display
  const finalKeys = useMemo(() => {
    if (columns) {
      // Use explicit columns if provided, filter out excluded ones
      return columns.filter((key) => !excludeColumns.includes(key));
    }

    // Otherwise, auto-detect all available columns
    const allFlatKeys = Array.from(
      new Set(flattenedData.flatMap((item) => Object.keys(item.flattened)))
    );
    
    // Filter out excluded columns and completely empty columns
    const availableKeys = allFlatKeys.filter((key) => !excludeColumns.includes(key));
    
    const hasNonEmptyValues = (key: string): boolean => {
      return flattenedData.some((item) => {
        const value = item.flattened[key];
        return value !== null && value !== undefined && value !== "";
      });
    };

    return availableKeys.filter(hasNonEmptyValues);
  }, [columns, excludeColumns, flattenedData]);

  return {
    processedData: flattenedData,
    arrayKeys,
    finalKeys,
  };
};
