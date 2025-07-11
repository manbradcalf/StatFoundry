import { useMemo } from "react";
import { TableGroup, ProcessedDataItem } from "../types";
import { identifyingFields } from "../config";

interface UseTableDataProps {
  data: any[];
  excludeColumns: string[];
  columnGroups: TableGroup[];
}

interface UseTableDataReturn {
  processedData: ProcessedDataItem[];
  allFlatKeys: string[];
  arrayKeys: string[];
  availableKeys: string[];
  nonEmptyKeys: string[];
  finalKeys: string[];
}

export const useTableData = ({
  data,
  excludeColumns,
  columnGroups,
}: UseTableDataProps): UseTableDataReturn => {
  // Flatten nested objects and separate array data
  const processedData = useMemo(() => {
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

  // Get all available keys from flattened data
  const allFlatKeys = useMemo(() => {
    return Array.from(
      new Set(processedData.flatMap((item) => Object.keys(item.flattened)))
    );
  }, [processedData]);

  // Get array keys
  const arrayKeys = useMemo(() => {
    return Array.from(
      new Set(processedData.flatMap((item) => Object.keys(item.arrays)))
    );
  }, [processedData]);

  // Filter out excluded columns
  const availableKeys = useMemo(() => {
    return allFlatKeys.filter((key) => !excludeColumns.includes(key));
  }, [allFlatKeys, excludeColumns]);

  // Filter out columns that are completely empty
  const nonEmptyKeys = useMemo(() => {
    /**
     * Check if a column has any non-empty values across all rows
     * @param key - The column key to check
     * @returns true if the column has at least one non-empty value
     */
    const hasNonEmptyValues = (key: string): boolean => {
      return processedData.some((item) => {
        const value = item.flattened[key];
        // Only filter out null, undefined, and empty strings
        return value !== null && value !== undefined && value !== "";
      });
    };

    return availableKeys.filter(hasNonEmptyValues);
  }, [availableKeys, processedData]);

  // Prioritize key identifying fields for master rows
  const finalKeys = useMemo(() => {
    const identifyingKeysPresent = identifyingFields.filter((key) =>
      nonEmptyKeys.includes(key)
    );
    const remainingKeys = nonEmptyKeys.filter(
      (key) => !identifyingFields.includes(key)
    );

    // Group remaining columns by category
    const groupedKeys: string[] = [];
    const usedKeys = new Set<string>(identifyingKeysPresent);

    // Sort groups by priority and add their keys
    columnGroups
      .sort((a, b) => a.priority - b.priority)
      .forEach((group) => {
        const groupKeys = group.keys.filter(
          (key) => nonEmptyKeys.includes(key) && !usedKeys.has(key)
        );
        groupKeys.forEach((key) => usedKeys.add(key));
        groupedKeys.push(...groupKeys);
      });

    // Add any remaining uncategorized keys
    const uncategorizedKeys = remainingKeys.filter((key) => !usedKeys.has(key));

    // Final column order: identifying fields first, then grouped fields, then uncategorized
    return [...identifyingKeysPresent, ...groupedKeys, ...uncategorizedKeys];
  }, [nonEmptyKeys, columnGroups]);

  return {
    processedData,
    allFlatKeys,
    arrayKeys,
    availableKeys,
    nonEmptyKeys,
    finalKeys,
  };
};
