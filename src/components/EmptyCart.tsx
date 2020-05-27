import arrowLeftIcon from "images/arrow-left.svg";
import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import cartIcon from "../images/cart-empty.svg";
import crossIcon from "../images/cross-clear.svg";
import pinkBackground from "../images/pink-background.svg";

import { baseUrl } from "../app/routes";
import Button from "./Button";

const EmptyCart: React.FC<{}> = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="cart-page__empty inner-page-wrapper">
      <div className="cart-page__empty-close">
        <ReactSVG
          path={crossIcon}
          className="empty-icon"
          onClick={handleBack}
        />
      </div>
      <div
        className="cart-page__empty-icon"
        style={{ backgroundImage: `url(${pinkBackground})` }}
      >
        <div className="cart-page__empty-icon-circle">
          <ReactSVG path={cartIcon} className="empty-icon" />
        </div>
      </div>
      <h4>Your cart is empty</h4>
      <p>You haven’t added anything yet.</p>
      <div className="cart-page__empty__action">
        <Link to={baseUrl}>
          <Button className="home-page__btn">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
