import React from 'react';
import ReactSVG from "react-svg";
import filterIcon from "../../images/filter-icon.svg";

export const FilterCollection = () => {
  return(
    <div className="collection-wrapper__main">
      <ReactSVG path={filterIcon} className="collection-wrapper__main-icon"/>
      <span className="collection-wrapper__main-name">Filters</span>
    </div>
  )
}