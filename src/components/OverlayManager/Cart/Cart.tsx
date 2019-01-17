import "./scss/index.scss";

import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { Button, Overlay, OverlayContextInterface } from "../..";
import { priceToString } from "../../../core/utils";
import { checkoutLoginUrl } from "../../App/routes";
import { CartContext } from "../../CartProvider/context";
import { Error } from "../../Error";
import GoToCart from "../../GoToCart";
import { GoToCheckout } from "../../GoToCheckout";
import Loader from "../../Loader";
import Offline from "../../Offline";
import OfflinePlaceholder from "../../OfflinePlaceholder";
import Online from "../../Online";
import { ShopContext } from "../../ShopProvider/context";
import { UserContext } from "../../User/context";
import Empty from "./Empty";
import ProductList from "./ProductList";

import cartImg from "../../../images/cart.svg";
import closeImg from "../../../images/x.svg";

const Cart: React.SFC<{ overlay: OverlayContextInterface }> = ({ overlay }) => (
  <Overlay context={overlay}>
    <Online>
      <ApolloConsumer>
        {client => (
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
                          <GoToCart apolloClient={client} cart={cart} secondary>
                            Go to my bag
                          </GoToCart>
                        </div>
                        <div className="cart__footer__button">
                          <UserContext.Consumer>
                            {({ user }) =>
                              user ? (
                                <GoToCheckout apolloClient={client} cart={cart}>
                                  Checkout
                                </GoToCheckout>
                              ) : (
                                <Link to={checkoutLoginUrl}>
                                  <Button>Checkout</Button>
                                </Link>
                              )
                            }
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
        )}
      </ApolloConsumer>
    </Online>
    <Offline>
      <div className="cart">
        <OfflinePlaceholder />
      </div>
    </Offline>
  </Overlay>
);

export default Cart;
