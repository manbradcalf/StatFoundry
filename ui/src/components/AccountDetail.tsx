import { useEffect, useState } from "react";
import { useSavedSearches } from "../hooks/useSavedSearches";
import { SavedSearch } from "../types/SavedSearch";
import { RouterProvider } from "react-router-dom";
import { useSearchAPIContext } from "../contexts/SearchAPIContext";

export const AccountDetail: React.FC = () => {
  return (
    <div>
      <SavedSearchesComponent />
    </div>
  );
};

export const SavedSearchesComponent: React.FC = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[] | null>([]);
  const { getUserSavedSearches } = useSavedSearches();
  const { executeSearch } = useSearchAPIContext();

  // todo: i dont love this mixing of async and promises throughout the project
  useEffect(() => {
    getUserSavedSearches()
      .then((x: SavedSearch[]) => {
        console.log(x);
        setSavedSearches(x);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [getUserSavedSearches, setSavedSearches]);

  const handleSearchFromSavedSearch = (savedSearch: SavedSearch) => {
    executeSearch(savedSearch.cypher, [], "");
    console.log("searching...", savedSearch);
  };

  return (
    <div style={{ display: "inline-block" }}>
      <div className="faqpage-wrapper">
        <div className="faqpage-question">
          <p>Saved Searches</p>
        </div>
        {savedSearches?.map((x) => {
          return (
            <div className="faqpage-wrapper">
              <h3>{x.name}</h3>
              <p>{x.description}</p>
              <button onClick={() => handleSearchFromSavedSearch(x)}>
                Search
              </button>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
};

export const SavedSearchComponent: React.FC<SavedSearch> = (
  savedSearch: SavedSearch,
) => {
  return <div>SavedSearch: {savedSearch.name}</div>;
};
