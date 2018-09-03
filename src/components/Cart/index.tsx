import * as React from "react";
import { Query } from "react-apollo";

import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import { CartContext, CartInterface, CartLineInterface } from "./context";
import { GET_VARIANTS } from "./queries";

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
              {cart.lines.length ? (
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
                      <ul>
                        {cart.lines.map(line => (
                          <li key={line.variantId}>
                            <img
                              src={productVariant.product.thumbnailUrl}
                              alt={productVariant.product.name}
                            />
                            {productVariant.product.name} Qty: {line.quantity}
                            <a onClick={() => cart.remove(productVariant.id)}>
                              Delete
                            </a>
                          </li>
                        ))}
                      </ul>
                    );
                  }}
                </Query>
              ) : (
                <div>Empty cart</div>
              )}
            </Overlay>
          ) : null
        }
      </CartContext.Consumer>
    )}
  </OverlayContext.Consumer>
);
