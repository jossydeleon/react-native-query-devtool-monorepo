import React from "react";
import { JSONTree } from "react-json-tree";
import theme from "./treeTheme";
import JSONTreeSearcheableProps from "./types";
import Searchbar from "../Searchbar";
import useTreeSearcheableData from "./useTreeSearcheableData";

const JSONTreeSearcheable: React.FC<JSONTreeSearcheableProps> = ({ data }) => {
  const { searchTerm, setSearchTerm, getItemString, highlightWord } =
    useTreeSearcheableData();

  return (
    <div style={{ flex: 1, borderWidth: 1, borderColor: "green" }}>
      <div>
        <Searchbar value={searchTerm} setValue={setSearchTerm} />
      </div>

      <JSONTree
        data={data}
        theme={theme}
        shouldExpandNodeInitially={() => true}
        getItemString={() => (
          <span dangerouslySetInnerHTML={{ __html: getItemString(data) }} />
        )}
        valueRenderer={(value: string) => (
          <span dangerouslySetInnerHTML={{ __html: highlightWord(value) }} />
        )}
      />
    </div>
  );
};

export default JSONTreeSearcheable;
