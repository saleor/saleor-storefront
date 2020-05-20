import * as React from "react";
import "./scss/index.scss";

export const DetailComponent = ({ name, value }) => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row data-table">
        <span className="data-box1">{name}:</span>
        <span className="data-box2">{value}</span>
      </div>
    </div>
  );
};
