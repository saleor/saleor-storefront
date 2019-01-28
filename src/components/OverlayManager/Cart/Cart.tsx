import "./scss/index.scss";

import * as React from "react";
import { generatePath, Link } from "react-router-dom";
import ReactSVG from "react-svg";

import {
  Button,
  Offline,
  OfflinePlaceholder,
  Online,
  Overlay,
  OverlayContextInterface
} from "../..";
import { baseUrl as checkoutUrl } from "../../../checkout/routes";
import { priceToString } from "../../../core/utils";
import { cartUrl, checkoutLoginUrl } from "../../App/routes";
import { CartContext } from "../../CartProvider/context";
import { Error } from "../../Error";
import Loader from "../../Loader";
import { ShopContext } from "../../ShopProvider/context";
import { UserContext } from "../../User/context";
import Empty from "./Empty";
import ProductList from "./ProductList";

import cartImg from "../../../images/cart.svg";
import closeImg from "../../../images/x.svg";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => (
  <Overlay context={overlay}>
    <Online>
      <CartContext.Consumer>
        {cart => {
          const { lines, loading, errors } = cart;
          if (loading) {
            return (
              <div className="cart">
                <Loader full />
              </div>
            );
          }

          if (errors) {
            return errors.map(error => <Error error={error.message} />);
          }

          return (
            <div className="cart">
              <div className="overlay__header">
                <ReactSVG
                  path={cartImg}
                  className="overlay__header__cart-icon"
                />
                <div className="overlay__header-text">
                  My bag,{" "}
                  <span className="overlay__header-text-items">
                    {lines.length || 0} items
                  </span>
                </div>
                <ReactSVG
                  path={closeImg}
                  onClick={overlay.hide}
                  className="overlay__header__close-icon"
                />
              </div>
              {lines.length ? (
                <>
                  <ProductList lines={lines} removeFromCart={cart.remove} />
                  <div className="cart__footer">
                    <div className="cart__footer__subtotoal">
                      <span>Subtotal</span>
                      <ShopContext.Consumer>
                        {({ defaultCountry, geolocalization }) => (
                          <span>
                            {priceToString(
                              cart.getTotal(),
                              geolocalization.country
                                ? geolocalization.country.code
                                : defaultCountry.code
                            )}
                          </span>
                        )}
                      </ShopContext.Consumer>
                    </div>

                    <div className="cart__footer__button">
                      <Link to={generatePath(cartUrl, { token: null })}>
                        <Button secondary>Go to my bag</Button>
                      </Link>
                    </div>
                    <div className="cart__footer__button">
                      <UserContext.Consumer>
                        {({ user }) => (
                          <Link to={user ? checkoutUrl : checkoutLoginUrl}>
                            <Button>Checkout</Button>
                          </Link>
                        )}
                      </UserContext.Consumer>
                    </div>
                  </div>
                </>
              ) : (
                <Empty overlayHide={overlay.hide} />
              )}
            </div>
          );
        }}
      </CartContext.Consumer>
    </Online>
    <Offline>
      <div className="cart">
        <OfflinePlaceholder />
      </div>
    </Offline>
  </Overlay>
);

export default Cart;
