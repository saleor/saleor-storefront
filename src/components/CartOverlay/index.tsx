import * as React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import ReactSVG from "react-svg";

import { Button } from "..";
import { priceToString } from "../../core/utils";
import { CartContext } from "../CartProvider/context";
import { GoToCheckout } from "../CheckoutPage";
import GoToCart from "../GoToCart";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import { GET_PRODUCTS_VARIANTS } from "../ProductPage/queries";

import "./scss/index.scss";

export const CartOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlay => (
      <CartContext.Consumer>
        {cart =>
          overlay.type === OverlayType.cart ? (
            <Overlay context={overlay}>
              <div className="cart">
                <div className="overlay__header">
                  <ReactSVG
                    path="../../images/cart.svg"
                    className="overlay__header__cart-icon"
                  />
                  <p>
                    My bag, <span>{cart.lines.length || 0} items</span>
                  </p>
                  <ReactSVG
                    path="../../images/x.svg"
                    onClick={() => overlay.hide()}
                    className="overlay__header__close-icon"
                  />
                </div>
                {cart.lines.length ? (
                  <Query
                    query={GET_PRODUCTS_VARIANTS}
                    variables={{
                      ids: cart.lines.map(line => line.variantId)
                    }}
                  >
                    {({ loading, error, data }) => {
                      const productsVariants = data.productVariants
                        ? data.productVariants.edges.map(edge => edge.node)
                        : [];
                      if (loading) {
                        return "Loading";
                      }
                      if (error) {
                        return `Error!: ${error}`;
                      }

                      return (
                        <>
                          <ul className="cart__list">
                            {productsVariants.map(variant => (
                              <li key={variant.id} className="cart__list__item">
                                <img
                                  src={variant.product.thumbnailUrl}
                                  alt={variant.product.name}
                                />
                                <div className="cart__list__item__details">
                                  <p>
                                    {variant.price.currency}
                                    {variant.price.amount}
                                  </p>
                                  <p>{variant.product.name}</p>
                                  <span className="cart__list__item__details__variant">
                                    <span>{variant.name}</span>
                                    <span>
                                      Qty:
                                      {cart.getVariantQuantity(variant.id)}
                                    </span>
                                  </span>
                                  <ReactSVG
                                    path="../../images/garbage.svg"
                                    className="cart__list__item__details__delete-icon"
                                    onClick={() => cart.remove(variant.id)}
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="cart__footer">
                            <div className="cart__footer__subtotoal">
                              <span>Subtotal</span>
                              <span>
                                {priceToString(cart.getTotal(productsVariants))}
                              </span>
                            </div>
                            <ApolloConsumer>
                              {client => (
                                <>
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
                                    <GoToCheckout
                                      apolloClient={client}
                                      cart={cart}
                                    >
                                      Checkout
                                    </GoToCheckout>
                                  </div>
                                </>
                              )}
                            </ApolloConsumer>
                          </div>
                        </>
                      );
                    }}
                  </Query>
                ) : (
                  <div className="cart__empty">
                    <h4>Yor bag is empty</h4>
                    <p>
                      You haven’t added anything to your bag. We’re sure you’ll
                      find something in our store
                    </p>
                    <div className="cart__empty__action">
                      <Button secondary onClick={() => overlay.hide()}>
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Overlay>
          ) : null
        }
      </CartContext.Consumer>
    )}
  </OverlayContext.Consumer>
);
