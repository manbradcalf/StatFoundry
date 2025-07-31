import React from "react";
import { BreadcrumbChain } from "./BreadcrumbChain";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";

export const SearchContent: React.FC = () => {
  return (
    <>
      <BreadcrumbChain />
      <SearchBar />
      <SearchResults />
    </>
  );
};