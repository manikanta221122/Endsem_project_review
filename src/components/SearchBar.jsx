import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;