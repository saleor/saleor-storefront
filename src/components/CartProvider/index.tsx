import * as React from "react";

import { PriceInterface, ProductVariantInterface } from "../../core/types";
import { CartContext, CartInterface, CartLineInterface } from "./context";

export default class CartProvider extends React.Component<
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
