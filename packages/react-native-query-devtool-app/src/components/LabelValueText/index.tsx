import React from "react";
import LabelValueProps from "./types";

const LabelValueText: React.FC<LabelValueProps> = ({ label, value }) => {
  return (
    <div style={{ color: "white", marginBottom: "8px" }}>
      <span>{label}</span>
      {value !== undefined && (
        <span style={{ fontWeight: "bold" }}>{`: ${value}`}</span>
      )}
    </div>
  );
};

export default LabelValueText;
