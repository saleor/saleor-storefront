import React, { useState } from "react";
import { Link } from 'react-router-dom'
import ReactSVG from "react-svg";
import heartFillIcon from "../../images/favorite-fill.svg";
import heartIcon from "../../images/favorite.svg";

export const CollectionBlock = (props) => {
  const { collect } = props
  const [heart, setWishlist] = useState(heartIcon);

  const handleWishlist = (e) => {
    const img = e.target.getAttribute("data-src");

    if (img === "/images/favorite.svg") {
      setWishlist(heartFillIcon);
    } else {
      setWishlist(heartIcon);
    }
  };

  return (
    <div className="block">
      <div className="block-img">
        <ReactSVG path={heart} className="block-img__heartIcon" onClick={handleWishlist}/>
        <Link to={`/collections/cabinets/${collect.id}/${collect.slug}`}>
          <img src={collect.backgroundImage.url}/>
        </Link>
      </div>
    </div>
  );
};