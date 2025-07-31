import { useEffect, useState } from "react";
import { useSavedSearches } from "../hooks/useSavedSearches";
import { SavedSearch } from "../types/SavedSearch";

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

  // todo: i dont love this mixing of async and promises throughout the project
  useEffect(() => {
    getUserSavedSearches()
      .then((x) => {
        console.log(savedSearches);
        setSavedSearches(x);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [getUserSavedSearches, setSavedSearches, savedSearches]);

  const handleSearchFromSavedSearch = (savedSearch: SavedSearch) => {
    console.log("searching...", savedSearch);
  };

  return (
    <div style={{ display: "inline-block" }}>
      {savedSearches?.map((x) => {
        return (
          <div
            style={{
              outline: "solid 1px",
              padding: "8px",
              width: "auto",
              alignSelf: "center",
            }}
          >
            <p>Name: {x.name}</p>
            <p>Description: {x.description}</p>
            <p>Id: {x.id}</p>
            <p>Created: {x.createdAt.seconds}</p>
            <p>updatedAt: {x.updatedAt.seconds}</p>
            <button onClick={() => handleSearchFromSavedSearch(x)}>
              Search
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const SavedSearchComponent: React.FC<SavedSearch> = (
  savedSearch: SavedSearch,
) => {
  return <div>SavedSearch: {savedSearch.name}</div>;
};
