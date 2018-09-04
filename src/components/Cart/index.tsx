import * as React from "react";
import { Query } from "react-apollo";
import ReactSVG from "react-svg";

import { Button } from "..";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import { CartContext, CartInterface, CartLineInterface } from "./context";
import { GET_VARIANTS } from "./queries";

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
                  <>
                    <Query
                      query={GET_VARIANTS}
                      // TODO: we don't have productVariants query definition yet, for now use only one
                      // https://github.com/mirumee/saleor/issues/2741
                      variables={{ id: cart.lines[0].variantId }}
                    >
                      {({ loading, error, data: { productVariant } }) => {
                        if (loading) {
                          return "Loading";
                        }
                        if (error) {
                          return `Error!: ${error}`;
                        }
                        return (
                          <ul className="cart__list">
                            {cart.lines.map(line => (
                              <li
                                key={line.variantId}
                                className="cart__list__item"
                              >
                                <img
                                  src={
                                    "http://localhost:8000" +
                                    productVariant.product.thumbnailUrl
                                  }
                                  alt={productVariant.product.name}
                                />
                                <div className="cart__list__item__details">
                                  <p>
                                    {productVariant.costPrice.currency}
                                    {productVariant.costPrice.amount}
                                  </p>
                                  <p>{productVariant.product.name}</p>
                                  <span className="cart__list__item__details__variant">
                                    <span>{productVariant.name}</span>
                                    <span>Qty: {line.quantity}</span>
                                  </span>
                                  <ReactSVG
                                    path="../../images/garbage.svg"
                                    className="cart__list__item__details__delete-icon"
                                    onClick={() =>
                                      cart.remove(productVariant.id)
                                    }
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        );
                      }}
                    </Query>
                    <div className="cart__footer">
                      <div className="cart__footer__subtotoal">
                        <span>Subtotal</span>
                        <span>$100</span>
                      </div>
                      <div className="cart__footer__button">
                        <Button>Checkout</Button>
                      </div>
                    </div>
                  </>
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
