import React from 'react';
import ReactSVG from "react-svg";
import listIcon from "../../images/baseline-list.svg";

export const ListCollection = () => {
  return(
    <div className="collection-wrapper__main">
      <ReactSVG path={listIcon} className="collection-wrapper__main-icon"/>
      <span className="collection-wrapper__main-name">List</span>
    </div>
  )
}