import React, { useState } from "react";
import ReactSVG from "react-svg";
import heartFillIcon from "../../images/favorite-fill.svg";
import heartIcon from "../../images/favorite_empty.svg";

export const CollectionBlock = (props) => {
  const { collect } = props
  const [heart, setWishlist] = useState(heartIcon);

  const handleWishlist = (e) => {
    const img = e.target.getAttribute("data-src");

    if (img === "/images/favorite_empty.svg") {
      setWishlist(heartFillIcon);
    } else {
      setWishlist(heartIcon);
    }
  };

  return (
    <div className="block">
      <div className="block-img">
        <ReactSVG path={heart} className="block-img__heartIcon" onClick={handleWishlist}/>
          <img src={collect.backgroundImage.url}/>
      </div>
    </div>
  );
};