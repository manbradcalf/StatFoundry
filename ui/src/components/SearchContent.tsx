import React from "react";
import { BreadcrumbChain } from "./BreadcrumbChain";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { CoolSearchesLibrary } from "./CoolSearchesLibrary";

export const SearchContent: React.FC = () => {
  return (
    <>
      <BreadcrumbChain />
      <SearchBar />
      <CoolSearchesLibrary />
      <SearchResults />
    </>
  );
};
