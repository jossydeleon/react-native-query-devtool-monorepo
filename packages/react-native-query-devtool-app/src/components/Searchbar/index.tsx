import * as React from "react";
import SearchbarProps from "./types";

const Searchbar: React.FC<SearchbarProps> = ({ value, setValue }) => {
  return (
    <input
      className="searchbar-input"
      type="search"
      placeholder="Filter"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export default Searchbar;
