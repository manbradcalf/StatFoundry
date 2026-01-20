import React, { useEffect, useRef } from "react";
import { useChainContext } from "../contexts/ChainContext";
import { useSearchAPIContext } from "../contexts/SearchAPIContext";
import { DynamicTable } from "./DynamicTable/";
import { commonStyles } from "../utils/commonStyles";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { columnGroups } from "./DynamicTable/config";

export const SearchResults: React.FC = () => {
  const { chain } = useChainContext();
  const { searchResults, searchError, isSearching, resultsCleared, clearSearch } = useSearchAPIContext();

  // Track previous chain to detect changes
  const prevChainRef = useRef(chain.Cypher);

  // Clear results when chain changes (user modified their query)
  useEffect(() => {
    if (prevChainRef.current !== chain.Cypher && searchResults !== null) {
      clearSearch();
    }
    prevChainRef.current = chain.Cypher;
  }, [chain.Cypher, searchResults, clearSearch]);
  if (isSearching) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  if (!searchResults && !searchError) {
    if (resultsCleared && chain.toArray().length > 0) {
      return (
        <div className="search-results-body">
          <p className="aliases-label" style={{ color: '#666', fontStyle: 'italic' }}>
            Your query has changed. Click Search to see updated results.
          </p>
        </div>
      );
    }
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
          <DynamicTable
            data={searchResults}
            enableExport={true}
            exportFilename="search-results"
            requireAuthForExport={true}
            columnGroups={columnGroups}
          />
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
