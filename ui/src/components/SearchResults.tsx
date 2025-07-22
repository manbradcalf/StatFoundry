import React from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { DynamicTable } from "./DynamicTable/";
import { commonStyles } from "../utils/commonStyles";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchResults: React.FC = () => {
  const { searchResults, searchError, isSearching, chain } = useSearchContext();
  if (isSearching) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  if (!searchResults && !searchError) {
    return null;
  }

  return (
    <div className="search-results-body">
      {searchError ? (
        <p className="aliases-label">
          {searchError}: {chain.toArray().map((x) => x.English + " ")}
        </p>
      ) : (
        <p className="aliases-label">
          {chain.toArray().map((x) => x.English + " ")}
        </p>
      )}
      {searchResults && !isSearching ? (
        <div>
          <DynamicTable data={searchResults} />
          {searchResults.length > 0 && (
            <div style={commonStyles.infoText}>
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} found
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
