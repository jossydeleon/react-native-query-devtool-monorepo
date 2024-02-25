import * as React from "react";
import TitleHeaderProps from "./types";

const TitleHeader: React.FC<TitleHeaderProps> = ({ title }) => {
  return (
    <div className="title-header-container">
      <h4 className="title-header">{title}</h4>
    </div>
  );
};

export default TitleHeader;
