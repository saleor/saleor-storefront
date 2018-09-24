import * as React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import ReactSVG from "react-svg";

import { Button } from "..";
import { PriceInterface, ProductVariantInterface } from "../../core/types";
import { priceToString } from "../../core/utils";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import { GET_PRODUCTS_VARIANTS } from "../ProductPage/queries";
import { CartContext, CartInterface, CartLineInterface } from "./context";

import "./scss/index.scss";

export class CartProvider extends React.Component<
  { children: any },
  CartInterface
> {
  constructor(props) {
    super(props);
    let lines;
    try {
      lines = JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      lines = [];
    }
    this.state = {
      add: this.add,
      changeQuantity: this.changeQuantity,
      clear: this.clear,
      getQuantity: this.getQuantity,
      getTotal: this.getTotal,
      getVariantQuantity: this.getVariantQuantity,
      lines,
      remove: this.remove
    };
  }

  changeQuantity = (variantId, quantity) => {
    const newLine: CartLineInterface = {
      quantity,
      variantId
    };
    this.setState(prevState => {
      let lines = prevState.lines.filter(line => line.variantId !== variantId);
      if (newLine.quantity > 0) {
        lines = [...lines, newLine];
      }
      return { lines };
    });
  };

  add = (variantId, quantity = 1) => {
    const line = this.state.lines.find(line => line.variantId === variantId);
    const newQuantity = line ? line.quantity + quantity : quantity;
    this.changeQuantity(variantId, newQuantity);
  };

  clear = () => this.setState({ lines: [] });

  getQuantity = () =>
    this.state.lines.reduce((sum, line) => sum + line.quantity, 0);

  getTotal = (productsVariants: ProductVariantInterface[]): PriceInterface => {
    const quantityMapping = this.state.lines.reduce((obj, line) => {
      obj[line.variantId] = line.quantity;
      return obj;
    }, {});
    const amount = productsVariants.reduce(
      (sum, variant) =>
        sum + variant.price.amount * quantityMapping[variant.id],
      0
    );
    const { currency } = productsVariants[0].price;
    return { amount, currency };
  };

  getVariantQuantity = variantId => {
    const line = this.state.lines.filter(
      line => line.variantId === variantId
    )[0];
    return line.quantity;
  };

  remove = variantId => this.changeQuantity(variantId, 0);

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem("cart", JSON.stringify(this.state.lines));
  }

  render() {
    const { children } = this.props;
    return (
      <CartContext.Provider value={this.state}>{children}</CartContext.Provider>
    );
  }
}

export const CartOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlay => (
      <CartContext.Consumer>
        {cart =>
          overlay.type === OverlayType.cart ? (
            <Overlay context={overlay}>
              <div className="cart">
                <div className="cart__header">
                  <ReactSVG
                    path="../../images/cart.svg"
                    className="cart__header__cart-icon"
                  />
                  <p>
                    My bag, <span>{cart.lines.length || 0} items</span>
                  </p>
                  <ReactSVG
                    path="../../images/x.svg"
                    onClick={() => overlay.hide()}
                    className="cart__header__close-icon"
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
                            <div className="cart__footer__button">
                              <Button>Go to checkout</Button>
                            </div>
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
