import React from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { DynamicTable } from "./DynamicTable";

export const SearchResults: React.FC = () => {
  const { searchResults, searchError } = useSearchContext();

  if (!searchResults && !searchError) {
    return null;
  }

  return (
    <div className="search-results-body">
      {searchResults ? (
        <div>
          <DynamicTable data={searchResults} maxHeight="600px" />
          {searchResults.length > 0 && (
            <div
              style={{
                color: "#64748b",
                fontSize: "14px",
                marginTop: "12px",
                textAlign: "center",
              }}
            >
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} found
              {/* Show expand hint if there are expandable rows */}
              {searchResults.some((item: any) =>
                Object.values(item).some(
                  (value: any) =>
                    value &&
                    typeof value === "object" &&
                    Object.values(value).some((nestedValue: any) =>
                      Array.isArray(nestedValue)
                    )
                )
              ) && " • Click ▶ to expand details"}
            </div>
          )}
        </div>
      ) : (
        <div style={{ color: "#888", textAlign: "center" }}>No results</div>
      )}
      {searchError && <p style={{ color: "red" }}>{searchError}</p>}
    </div>
  );
};
