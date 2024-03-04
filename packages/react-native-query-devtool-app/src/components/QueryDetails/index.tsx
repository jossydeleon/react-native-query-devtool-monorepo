import React from "react";
import TitleHeader from "../TitleHeader";
import LabelValueText from "../LabelValueText";
import QueryDetailsProps from "./types";
import JSONTreeSearcheable from "../JSONTreeSearcheable";

const QueryDetails: React.FC<QueryDetailsProps> = ({
  selectedQuery,
  queryLastUpdated,
}) => {
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
            <JSONTreeSearcheable data={selectedQuery?.data} />
          </div>
        </div>
      </div>
    );
  }

  return undefined;
};

export default QueryDetails;
