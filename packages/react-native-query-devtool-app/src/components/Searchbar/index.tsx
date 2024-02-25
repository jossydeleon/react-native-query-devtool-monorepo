import * as React from "react";
import SearchbarProps from "./types";

const Searchbar: React.FC<SearchbarProps> = ({ value, setValue }) => {
  return (
    <div className="searchbar-container">
      <input
        className="searchbar-input"
        type="search"
        placeholder="Filter"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
};

export default Searchbar;
