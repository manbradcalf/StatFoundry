import { useEffect, useState } from "react";
import { useSavedSearches } from "../hooks/useSavedSearches";
import { SavedSearch } from "../types/SavedSearch";
import { useSearchAPIContext } from "../contexts/SearchAPIContext";
import { useNavigate } from "react-router-dom";
import { useChainState } from "../hooks/useChainState";

export const AccountDetail: React.FC = () => {
  return (
    <div>
      <SavedSearchesComponent />
    </div>
  );
};

export const SavedSearchesComponent: React.FC = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[] | null>([]);
  const { getUserSavedSearches, loadSavedSearch } = useSavedSearches();
  const { executeSearch } = useSearchAPIContext();

  // const {replaceChain} = useChainState();

  const navigate = useNavigate();

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
    // replaceChain(savedSearch)
    executeSearch(savedSearch.cypher, savedSearch.aliases, "");
    navigate("/", { state: { message: "hello" } });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <div className="faqpage-wrapper">
        <div className="faqpage-question">
          <p>Saved Searches</p>
        </div>
        {savedSearches?.map((x) => {
          return (
            <div key={x.id} className="faqpage-wrapper">
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
