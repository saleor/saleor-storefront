import arrowLeftIcon from "images/arrow-left.svg";
import cartIcon from "images/cart-icon.svg";
import searchIcon from "images/search-icon.svg";
import * as React from "react";
import ReactSVG from "react-svg";
import { CollectionBlock } from "../../components/Collection/CollectionBlock";
import { FilterCollection } from "../../components/Collection/FilterCollection";
import { GridCollection } from "../../components/Collection/GridCollection";
import { ListCollection } from "../../components/Collection/ListCollection";
import "./scss/index.scss";

const Page = props => {

  const { data, history } = props

  const handleBackButton = () => {
    history.push('/')
  }

  return (
    <div className="browse-cabinet">
      <div className="browse-cabinet__header">
        <div className="browse-cabinet__header-left" onClick={handleBackButton}>
            <ReactSVG path={arrowLeftIcon} className="browse-cabinet__header-icon"/>
        </div>
        <div className="browse-cabinet__header-right">
          <ReactSVG path={cartIcon} className="browse-cabinet__header-icon cart-icon"/>
          <ReactSVG path={searchIcon} className="browse-cabinet__header-icon search-icon"/>
        </div>
      </div>
      <div className="browse-cabinet__heading">
        <h3>Browse Cabinets</h3>
      </div>
      <div className="collection">
        <div className="collection-wrapper">
          <FilterCollection />
        </div>
        <div className="collection-wrapper">
          <GridCollection />
          <ListCollection />
        </div>
      </div>
      <div className="collection-block">
        <div className="collection-block__wrapper">
        { data.collections.edges.map((collection, i) => {
          return <CollectionBlock key={i} collect={collection.node}/>
        })}
        </div>
      </div>
    </div>
  );
}

export default Page;
