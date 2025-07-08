import React from "react";
import { useSearchContext } from "../contexts/SearchContext";
import FilterResultsToggle from "./FilterResultsChips"

export const SearchResults: React.FC = () => {
  const { searchResults, searchError } = useSearchContext();

  // Only render if there are results or an error
  if (!searchResults && !searchError) {
    return null;
  }

  return (
    <div className="search-results-body">
      <div>
        {/* <FilterResultsToggle /> */}
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            width: "100%",
            maxWidth: "600px",
            // padding: "16px",
            borderRadius: "4px",
            textAlign: "start",
            overflow: "auto",
            whiteSpace: "pre-wrap",
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: "14px",
            lineHeight: "1.4",
          }}
        >
          {searchResults ? (
            JSON.stringify(searchResults, null, 2)
          ) : (
            <div style={{ color: "#888", textAlign: "center" }}>No results</div>
          )}
        </pre>
      </div>
      <p style={{ color: searchError ? "red" : "#888" }}>
        {searchError ? searchError : ""}
      </p>
    </div>
  );
};
