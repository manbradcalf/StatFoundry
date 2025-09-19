import { useMemo } from "react";
import { ProcessedDataItem } from "../types";

interface UseTableDataProps {
  data: any[];
  columns?: string[];
  excludeColumns: string[];
  visibleColumns?: string[];
}

interface UseTableDataReturn {
  processedData: ProcessedDataItem[];
  finalKeys: string[];
  availableColumns: string[];
}

export const useTableData = ({
  data,
  columns,
  excludeColumns,
  visibleColumns,
}: UseTableDataProps): UseTableDataReturn => {
  // Map objects and separate array data
  const processData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item) => {
      const mapped: any = {};

      const mapObject = (obj: any, prefix = "") => {
        Object.keys(obj).forEach((key) => {
          const value = Array.isArray(obj[key]) ? obj[key].join() : obj[key];
          const newKey = prefix ? `${prefix}.${key}` : key;

          // TODO: parse things like python dates being returned as json
          /**
            *
            * Example
            *
            *     "p.end_clock_time": {
      "_DateTime__date": {
        "_Date__ordinal": 738773,
        "_Date__year": 2023,
        "_Date__month": 9,
        "_Date__day": 10
      },
      "_DateTime__time": {
        "_Time__ticks": 65629637000000,
        "_Time__hour": 18,
        "_Time__minute": 13,
        "_Time__second": 49,
        "_Time__nanosecond": 637000000,
        "_Time__tzinfo": {}
      }
    },
            *
            */
          mapped[newKey] = value;
        });
      };

      mapObject(item);
      return { processed: mapped };
    });
  }, [data]);

  // Determine available columns (all columns that could be shown)
  const availableColumns = useMemo(() => {
    if (columns) {
      // Use explicit columns if provided, filter out excluded ones
      return columns.filter((key) => !excludeColumns.includes(key));
    }

    // Otherwise, auto-detect all available columns
    const allFlatKeys = Array.from(
      new Set(processData.flatMap((item) => Object.keys(item.processed))),
    );

    // Filter out excluded columns and completely empty columns
    const filteredKeys = allFlatKeys.filter(
      (key) => !excludeColumns.includes(key),
    );

    const hasNonEmptyValues = (key: string): boolean => {
      return processData.some((item) => {
        const value = item.processed[key];
        return value !== null && value !== undefined && value !== "";
      });
    };

    return filteredKeys.filter(hasNonEmptyValues);
  }, [columns, excludeColumns, processData]);

  // Determine final columns to display (filtered by visibility)
  const finalKeys = useMemo(() => {
    // If visibleColumns is provided, filter to only show visible columns
    if (visibleColumns) {
      return availableColumns.filter((key) => visibleColumns.includes(key));
    }

    return availableColumns;
  }, [availableColumns, visibleColumns]);

  return {
    processedData: processData,
    finalKeys,
    availableColumns,
  };
};
