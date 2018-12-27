import * as React from "react";

import { ApolloClient } from "apollo-client";
import { GET_CHECKOUT, UPDATE_CHECKOUT_LINE } from "../CheckoutApp/queries";
import { productVariatnsQuery } from "../ProductPage/queries";
import { CartContext, CartInterface, CartLineInterface } from "./context";

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

  changeQuantity = async (variantId, quantity) => {
    this.setState({ loading: true });
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

    const checkoutToken = localStorage.getItem("checkout");
    if (checkoutToken) {
      const { apolloClient } = this.props;
      let data: { [key: string]: any };
      const response = await apolloClient.query({
        query: GET_CHECKOUT,
        variables: { token: checkoutToken }
      });
      data = response.data;
      const checkoutID = data.checkout.id;
      await apolloClient.mutate({
        mutation: UPDATE_CHECKOUT_LINE,
        update: (cache, { data: { checkoutLinesUpdate } }) => {
          cache.writeQuery({
            data: { checkout: checkoutLinesUpdate.checkout },
            query: GET_CHECKOUT
          });
        },
        variables: {
          checkoutId: checkoutID,
          lines: [
            {
              quantity,
              variantId
            }
          ]
        }
      });
      this.setState({ loading: false });
    }
  };

  add = (variantId, quantity = 1) => {
    const line = this.state.lines.find(line => line.variantId === variantId);
    const newQuantity = line ? line.quantity + quantity : quantity;
    this.changeQuantity(variantId, newQuantity);
  };

  clear = () => this.setState({ lines: [] });

  fetch = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length) {
      this.setState({ loading: true });
      const { apolloClient } = this.props;
      let data: { [key: string]: any };
      let lines;
      const response = await apolloClient.query({
        query: productVariatnsQuery,
        variables: { ids: cart.map(line => line.variantId) }
      });
      const quantityMapping = cart.reduce((obj, line) => {
        obj[line.variantId] = line.quantity;
        return obj;
      }, {});
      data = response.data;
      lines = data.productVariants
        ? data.productVariants.edges.map(variant => ({
            quantity: quantityMapping[variant.node.id],
            variant: variant.node,
            variantId: variant.node.id
          }))
        : [];
      if (data.errors) {
        this.setState({
          errors: data.errors,
          lines: [],
          loading: false
        });
      } else {
        this.setState({ loading: false, lines, errors: null });
      }
    }
  };

  getQuantity = () =>
    this.state.lines.reduce((sum, line) => sum + line.quantity, 0);

  getTotal = (): { amount: number; currency: string } => {
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
    if (JSON.stringify(this.state.lines) !== JSON.stringify(prevState.lines)) {
      localStorage.setItem("cart", JSON.stringify(this.state.lines));
    }
  }

  render() {
    const { children } = this.props;
    return (
      <CartContext.Provider value={this.state}>{children}</CartContext.Provider>
    );
  }
}
