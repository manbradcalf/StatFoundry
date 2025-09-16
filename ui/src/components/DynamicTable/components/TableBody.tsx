import React from "react";
import { ProcessedDataItem } from "../types";
import { isClickable } from "../../../utils/tableUtils";
import { generateClickableUrl } from "../../../utils/linkHandlers";
import { Link } from "react-router-dom";

interface TableBodyProps {
  paginatedData: ProcessedDataItem[];
  finalKeys: string[];
  startIndex: number;
  excludeColumns: string[];
}

export const TableBody: React.FC<TableBodyProps> = ({
  paginatedData,
  finalKeys,
  startIndex,
}) => {
  return (
    <tbody>
      {paginatedData.map((item, index) => (
        <tr key={startIndex + index}>
          {finalKeys.map((key, colIndex) => {
            const value = item.flattened[key];
            let displayValue;
            if (Array.isArray(value)) {
              displayValue = JSON.stringify(value);
            } else {
              displayValue = isClickable(key)
                ? (() => {
                    const linkUrl = generateClickableUrl(key, item.flattened);
                    return linkUrl ? (
                      linkUrl.startsWith("http") ? (
                        <a
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#007bff", textDecoration: "none" }}
                        >
                          {String(value || "")}
                        </a>
                      ) : (
                        <Link
                          to={linkUrl}
                          style={{ color: "#007bff", textDecoration: "none" }}
                        >
                          {String(value || "")}
                        </Link>
                      )
                    ) : (
                      String(value || "")
                    );
                  })()
                : String(value || "");
            }
            return (
              <td key={key} className={colIndex === 0 ? "first-column" : ""}>
                {displayValue}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
