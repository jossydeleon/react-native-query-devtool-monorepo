import * as React from "react";
import TitleHeader from "../TitleHeader";
import LabelValueText from "../LabelValueText";
import { JSONTree } from "react-json-tree";
import QueryDetailsProps from "./types";
import theme from "./treeTheme";

const QueryDetails: React.FC<QueryDetailsProps> = ({
  selectedQuery,
  queryLastUpdated,
}) => {
  const getItemString = (data: unknown) => {
    const size = Object.keys(data).length;

    if (size === 0) {
      return null;
    }

    const pluralize = size > 1 ? "items" : "item";
    const displayText = `${size} ${pluralize}`;

    return <span style={{ fontSize: 11 }}>{displayText}</span>;
  };

  if (selectedQuery) {
    return (
      <div className="column">
        <div className="panel-container">
          <div>
            <TitleHeader title="Query Details" />

            <LabelValueText label={JSON.stringify(selectedQuery?.queryKey)} />

            <LabelValueText
              label="Observers"
              value={selectedQuery?.observers || 0}
            />

            {queryLastUpdated && (
              <LabelValueText label="Last updated" value={queryLastUpdated} />
            )}
          </div>

          <div style={{ marginBottom: 20 }} />

          <div>
            <TitleHeader title="Data Explorer" />
            <JSONTree
              data={selectedQuery?.data}
              theme={theme}
              shouldExpandNodeInitially={() => true}
              getItemString={(_, data) => getItemString(data)}
            />
          </div>
        </div>
      </div>
    );
  }

  return undefined;
};

export default QueryDetails;
