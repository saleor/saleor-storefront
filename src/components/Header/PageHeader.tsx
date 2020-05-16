import * as React from "react";
import ReactSVG from "react-svg";
import arrowLeftIcon from "../../images/arrow-left.svg";
import cartIcon from "../../images/cart-icon.svg";
import searchIcon from "../../images/search-icon.svg";
import { Link } from "react-router-dom";

import { CartContext } from "../../components/CartProvider/context";

export default props => {
  return (
    <CartContext.Consumer>
      {cart => <PageHeader cartLines={cart.lines} {...props} />}
    </CartContext.Consumer>
  );
};

const PageHeader = ({ handleClick, back, search, cart, cartLines }: any) => {
  let cartItemsCount = 0;
  if (cartLines && cartLines.length) {
    cartItemsCount = cartLines
      .map(line => line.quantity)
      .reduce((sum, next) => sum + next, 0);
  }

  return (
    <div className="browse-cabinet__header">
      <div className="browse-cabinet__header-left" onClick={handleClick}>
        {back && (
          <ReactSVG
            path={arrowLeftIcon}
            className="browse-cabinet__header-icon"
          />
        )}
      </div>
      <div className="browse-cabinet__header-right">
        {cart && (
          <div className="cart-main">
            <Link to="/cart">
              <span className="cart-main-item">{cartItemsCount}</span>
              <ReactSVG
                path={cartIcon}
                className="browse-cabinet__header-icon cart-icon"
              />
            </Link>
          </div>
        )}
        {search && (
          <ReactSVG
            path={searchIcon}
            className="browse-cabinet__header-icon search-icon"
          />
        )}
      </div>
    </div>
  );
};
