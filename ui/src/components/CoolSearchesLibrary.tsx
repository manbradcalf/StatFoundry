import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useChainContext } from "../contexts/ChainContext";
import { useSearchAPIContext } from "../contexts/SearchAPIContext";
import { ChunkChain } from "../feature/Chunks/ChunkChain";
import {
  exampleSearches,
  searchCategories,
  ExampleSearch,
  SearchCategory,
} from "../data/exampleSearches";

/**
 * CoolSearchesLibrary - A discoverable library of pre-built example searches
 * that users can explore and learn from.
 *
 * Features:
 * - Displays curated example searches with titles and descriptions
 * - Category filtering for easy navigation
 * - One-click execution of example searches
 * - Loads the search into the chain and shows results
 */
export const CoolSearchesLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const { loadChain } = useChainContext();
  const { executeSearch } = useSearchAPIContext();
  const navigate = useNavigate();

  const handleRunSearch = useCallback(
    (search: ExampleSearch) => {
      // Build a ChunkChain from the search's chunks
      const chain = new ChunkChain();
      search.chunks.forEach((chunk) => chain.append(chunk));
      chain.compile();

      // Compile chain and load it into the context (updates breadcrumbs)
      chain.compile()
      loadChain(chain);

      // Execute the search with selected properties if defined
      executeSearch(search.cypher, search.aliases, search.english, search.selectedProperties);

      // Navigate to home to show results
      navigate("/");

      // Collapse the library after selection
      setIsExpanded(false);
    },
    [loadChain, executeSearch, navigate]
  );

  const filteredSearches =
    selectedCategory === "all"
      ? exampleSearches
      : exampleSearches.filter((search) => search.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "rushing":
        return "RB";
      case "passing":
        return "QB";
      case "receiving":
        return "WR";
      case "general":
        return "ALL";
      case "advanced":
        return "ADV";
      default:
        return "ALL";
    }
  };

  return (
    <div className="cool-searches-library">
      <button
        className="cool-searches-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="toggle-icon">{isExpanded ? "-" : "+"}</span>
        <span className="toggle-text">Example Searches</span>
        <span className="toggle-count">{exampleSearches.length}</span>
      </button>

      {isExpanded && (
        <div className="cool-searches-content">
          <div className="cool-searches-header">
            <p className="cool-searches-intro">
              Explore pre-built searches to discover insights and learn how to use
              StatFoundry
            </p>
          </div>

          <div className="category-filters">
            {searchCategories.map((category) => (
              <button
                key={category.id}
                className={`category-filter ${selectedCategory === category.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="cool-searches-grid">
            {filteredSearches.map((search) => (
              <div key={search.id} className="cool-search-card">
                <div className="cool-search-header">
                  <span className={`category-badge ${search.category}`}>
                    {getCategoryIcon(search.category)}
                  </span>
                  <h3 className="cool-search-title">{search.title}</h3>
                </div>
                <p className="cool-search-description">{search.description}</p>
                <div className="cool-search-footer">
                  <code className="cool-search-preview">{search.english}</code>
                  <button
                    className="run-search-button"
                    onClick={() => handleRunSearch(search)}
                    title="Run this search"
                  >
                    Run Search
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredSearches.length === 0 && (
            <div className="no-searches-message">
              <p>No searches found in this category yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
