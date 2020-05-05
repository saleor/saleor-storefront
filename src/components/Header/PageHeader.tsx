import * as React from 'react';
import ReactSVG from "react-svg";
import arrowLeftIcon from "../../images/arrow-left.svg";
import cartIcon from "../../images/cart-icon.svg";
import searchIcon from "../../images/search-icon.svg";

export const PageHeader = (props) => {
  const { handleClick } = props

  return(
    <div className="browse-cabinet__header">
      <div className="browse-cabinet__header-left" onClick={handleClick}>
        <ReactSVG path={arrowLeftIcon} className="browse-cabinet__header-icon"/>
      </div>
      <div className="browse-cabinet__header-right">
        <ReactSVG path={cartIcon} className="browse-cabinet__header-icon cart-icon"/>
        <ReactSVG path={searchIcon} className="browse-cabinet__header-icon search-icon"/>
      </div>
    </div>
  )
}