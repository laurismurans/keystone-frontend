"use client";

import SearchForm from "./search-form";
import SearchResult from "./search-result";

function Search(): JSX.Element {
  return (
    <>
      <SearchForm />
      <div className="mt-8">
        <SearchResult />
      </div>
    </>
  );
}

export default Search;
