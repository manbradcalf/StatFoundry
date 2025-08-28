import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChainContext } from "../contexts/ChainContext";
import { useSearchAPIContext } from "../contexts/SearchAPIContext";
import { useSavedSearches } from "../hooks/useSavedSearches";
import { savedSearchService } from "../services/savedSearchService";
import { SavedSearch } from "../types/SavedSearch";

export const SavedSearchesComponent: React.FC = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[] | null>([]);
  const { getUserSavedSearches, deleteSavedSearch } = useSavedSearches();
  const { executeSearch } = useSearchAPIContext();
  const { loadChain } = useChainContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUserSavedSearches()
      .then((x: SavedSearch[]) => {
        setSavedSearches(x);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [getUserSavedSearches, setSavedSearches]);

  const handleSearchFromSavedSearch = (savedSearch: SavedSearch) => {
    // 1. Restore the chain/breadcrumbs from saved chunks
    const restoredChain = savedSearchService.mapSaveDataToChain(savedSearch);
    loadChain(restoredChain);

    // 2. Execute the search
    executeSearch(savedSearch.cypher, savedSearch.aliases, savedSearch.english);

    // 3. Navigate to results
    navigate("/");
  };

  const handleDeleteSavedSearch = async (searchId: string) => {
    if (window.confirm("Are you sure you want to delete this saved search?")) {
      const success = await deleteSavedSearch(searchId);
      if (success && savedSearches) {
        // Remove the deleted search from the local state
        setSavedSearches(
          savedSearches.filter((search) => search.id !== searchId),
        );
      }
    }
  };

  if (!savedSearches || savedSearches.length === 0) {
    return (
      <div className="saved-searches-section">
        <div className="section-header">
          <h2>Saved Searches</h2>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-title">No saved searches yet</p>
          <p className="empty-subtitle">
            Save your first search to see it here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-searches-section">
      <div className="section-header">
        <h2>Saved Searches</h2>
        <span className="search-count">{savedSearches.length}</span>
      </div>
      <div className="saved-searches-grid">
        {savedSearches.map((search) => {
          return (
            <div key={search.id} className="saved-search-card">
              <div className="search-header">
                <h3 className="search-name">{search.name}</h3>
                <div className="search-actions">
                  <button
                    className="action-button run-button"
                    onClick={() => handleSearchFromSavedSearch(search)}
                    title="Run this search"
                  >
                    ▶️
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDeleteSavedSearch(search.id)}
                    title="Delete search"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {search.description && (
                <p className="search-description">{search.description}</p>
              )}
              <div className="search-footer">
                <span className="search-date">Created Dec 15, 2024</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SavedSearchComponent: React.FC<SavedSearch> = (
  savedSearch: SavedSearch,
) => {
  return <div>SavedSearch: {savedSearch.name}</div>;
};
