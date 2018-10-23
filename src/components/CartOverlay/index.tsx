import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import ReactSVG from "react-svg";

import { Button } from "..";
import { priceToString } from "../../core/utils";
import { CartContext } from "../CartProvider/context";
import GoToCart from "../GoToCart";
import { GoToCheckout } from "../GoToCheckout";
import Loader from "../Loader";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";

import "./scss/index.scss";

export const CartOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlay =>
      overlay.type === OverlayType.cart ? (
        <Overlay context={overlay}>
          <ApolloConsumer>
            {client => (
              <CartContext.Consumer>
                {cart => {
                  const { lines, loading, errors } = cart;
                  if (loading) {
                    return <Loader />;
                  }
                  if (errors) {
                    return "Errors";
                  }
                  return (
                    <div className="cart">
                      <div className="overlay__header">
                        <ReactSVG
                          path="../../images/cart.svg"
                          className="overlay__header__cart-icon"
                        />
                        <p>
                          My bag, <span>{lines.length || 0} items</span>
                        </p>
                        <ReactSVG
                          path="../../images/x.svg"
                          onClick={() => overlay.hide()}
                          className="overlay__header__close-icon"
                        />
                      </div>
                      {lines.length ? (
                        <>
                          <ul className="cart__list">
                            {lines.map(line => (
                              <li
                                key={line.variant.id}
                                className="cart__list__item"
                              >
                                <img
                                  src={line.variant.product.thumbnailUrl}
                                  alt={line.variant.product.name}
                                />
                                <div className="cart__list__item__details">
                                  <p>
                                    {line.variant.price.currency}
                                    {line.variant.price.amount}
                                  </p>
                                  <p>{line.variant.product.name}</p>
                                  <span className="cart__list__item__details__variant">
                                    <span>{line.variant.name}</span>
                                    <span>
                                      Qty:
                                      {line.quantity}
                                    </span>
                                  </span>
                                  <ReactSVG
                                    path="../../images/garbage.svg"
                                    className="cart__list__item__details__delete-icon"
                                    onClick={() => cart.remove(line.variant.id)}
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="cart__footer">
                            <div className="cart__footer__subtotoal">
                              <span>Subtotal</span>
                              <span>{priceToString(cart.getTotal())}</span>
                            </div>

                            <div className="cart__footer__button">
                              <GoToCart
                                apolloClient={client}
                                cart={cart}
                                secondary
                              >
                                My bag
                              </GoToCart>
                            </div>
                            <div className="cart__footer__button">
                              <GoToCheckout apolloClient={client} cart={cart}>
                                Checkout
                              </GoToCheckout>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="cart__empty">
                          <h4>Yor bag is empty</h4>
                          <p>
                            You haven’t added anything to your bag. We’re sure
                            you’ll find something in our store
                          </p>
                          <div className="cart__empty__action">
                            <Button secondary onClick={() => overlay.hide()}>
                              Continue Shopping
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }}
              </CartContext.Consumer>
            )}
          </ApolloConsumer>
        </Overlay>
      ) : null
    }
  </OverlayContext.Consumer>
);
