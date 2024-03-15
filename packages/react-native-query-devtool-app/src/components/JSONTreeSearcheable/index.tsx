import React from "react";
import { JSONTree } from "react-json-tree";
import theme from "./treeTheme";
import JSONTreeSearcheableProps from "./types";
import Searchbar from "../Searchbar";
import useTreeSearcheableData from "./useTreeSearcheableData";

const JSONTreeSearcheable: React.FC<JSONTreeSearcheableProps> = ({ data }) => {
  const {
    searchTerm,
    setSearchTerm,
    getItemString,
    highlightLabel,
    highlightValue,
  } = useTreeSearcheableData();

  return (
    <div>
      <div className="json-tree-header">
        <Searchbar value={searchTerm} setValue={setSearchTerm} />
      </div>
      <div className="json-tree-header-container">
        <JSONTree
          data={data}
          theme={theme}
          keyPath={["data"]}
          getItemString={(_, currentData) => (
            <span
              dangerouslySetInnerHTML={{ __html: getItemString(currentData) }}
            />
          )}
          labelRenderer={([key]) => (
            <span dangerouslySetInnerHTML={{ __html: highlightLabel(key) }} />
          )}
          valueRenderer={(value: string) => (
            <span dangerouslySetInnerHTML={{ __html: highlightValue(value) }} />
          )}
        />
      </div>
    </div>
  );
};

export default JSONTreeSearcheable;
