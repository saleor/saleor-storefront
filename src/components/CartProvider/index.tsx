import * as React from "react";

import { ApolloClient } from "apollo-client";
import { PriceInterface, ProductVariantInterface } from "../../core/types";
import { GET_PRODUCTS_VARIANTS } from "../ProductPage/queries";
import { CartContext, CartInterface, CartLineInterface } from "./context";
import { GET_CHECKOUT } from "../CheckoutPage/queries";

export default class CartProvider extends React.Component<
  { children: any; apolloClient: ApolloClient<any> },
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
      errors: null,
      fetch: this.fetch,
      getQuantity: this.getQuantity,
      getTotal: this.getTotal,
      lines,
      loading: false,
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

  fetch = async () => {
    const { apolloClient } = this.props;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutToken = localStorage.getItem("checkout");
    let data: { [key: string]: any };
    let lines;
    this.setState({ loading: true });
    if (checkoutToken) {
      const response = await apolloClient.query({
        query: GET_CHECKOUT,
        variables: { token: checkoutToken }
      });
      data = response.data;
      lines = data.checkout
        ? data.checkout.lines.edges.map(edge => ({
            quantity: edge.node.quantity,
            variant: edge.node.variant,
            variantId: edge.node.variant.id
          }))
        : [];
    } else {
      const response = await apolloClient.query({
        query: GET_PRODUCTS_VARIANTS,
        variables: { ids: cart.map(line => line.variantId) }
      });
      const quantityMapping = cart.reduce((obj, line) => {
        obj[line.variantId] = line.quantity;
        return obj;
      }, {});
      data = response.data;
      lines = data.productsVariants
        ? data.productsVariants.map(variant => ({
            quantity: quantityMapping[variant.id],
            variant,
            variantId: variant.id
          }))
        : [];
    }
    if (data.errors) {
      this.setState({
        errors: data.errors,
        lines: [],
        loading: false
      });
    } else {
      this.setState({ loading: false, lines, errors: null });
    }
  };

  getQuantity = () =>
    this.state.lines.reduce((sum, line) => sum + line.quantity, 0);

  getTotal = (): PriceInterface => {
    const { lines } = this.state;
    const amount = lines.reduce(
      (sum, line) => sum + line.variant.price.amount * line.quantity,
      0
    );
    const { currency } = lines[0].variant.price;
    return { amount, currency };
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
