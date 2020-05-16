import doubleDoor from "images/P_double_door.png";
import * as React from "react";

export const CardBlock = ({ increaseQuantity, decreaseQuantity, quantity }) => {
  return (
    <div className="addcart-card">
      <div className="addcart-card--img">
        <div className="img-wrapper">
          <img src={doubleDoor} alt="Avatar" />
          <div className="small-img"></div>
        </div>
      </div>
      <div className="addcart-card-container">
        <div className="addcart-card-container--header">24" Double Door</div>

        <div className="addcart-card-container--sub-header">
          <span>SKU: W1230-CYOHH</span>
          <span>Dimensions: 10"w x 12"h x 24"d</span>
        </div>

        <div className="addcart-card-container--detail">
          <span className="detail-price">
            {" "}
            <b>$1,399</b>
          </span>
          <div className="detail-counter">
            <span className="qty-operator" onClick={decreaseQuantity}>
              -
            </span>
            <span className="qty-text">{quantity}</span>
            <span className="qty-operator" onClick={increaseQuantity}>
              +
            </span>
          </div>
        </div>

        <div className="addcart-card-container--btn">
          <button>
            {" "}
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
