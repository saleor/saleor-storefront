import * as React from "react";

import { ApolloClient } from "apollo-client";
import {
  CheckoutContext,
  CheckoutContextInterface
} from "../../checkout/context";
import {
  getCheckoutQuery,
  updateCheckoutLineQuery
} from "../../checkout/queries";
import {
  updateCheckoutLine,
  updateCheckoutLineVariables
} from "../../checkout/types/updateCheckoutLine";
import { maybe } from "../../core/utils";
import {
  CartContext,
  CartInterface,
  CartLine,
  CartLineInterface
} from "./context";

enum LocalStorageKeys {
  Cart = "cart"
}

export default class CartProvider extends React.Component<
  { checkout: CheckoutContextInterface; apolloClient: ApolloClient<any> },
  CartInterface
> {
  static contextType = CheckoutContext;
  context: CheckoutContextInterface;

  constructor(props) {
    super(props);

    let lines;
    try {
      lines = JSON.parse(localStorage.getItem(LocalStorageKeys.Cart)) || [];
    } catch {
      lines = [];
    }

    this.state = {
      add: this.add,
      changeQuantity: this.changeQuantity,
      clear: this.clear,
      clearErrors: this.clearErrors,
      errors: null,
      getQuantity: this.getQuantity,
      getTotal: this.getTotal,
      lines,
      loading: false,
      remove: this.remove,
      subtract: this.subtract
    };
  }

  getLine = (variantId: string): CartLineInterface =>
    this.state.lines.find(line => line.variantId === variantId);

  changeQuantity = async (lines: CartLine[]) => {
    this.setState({ loading: true });

    const { checkout } = this.props;
    const checkoutID = maybe(() => checkout.checkout.id);
    let apiError = false;

    if (checkoutID) {
      const { apolloClient } = this.props;
      const {
        data: {
          checkoutLinesUpdate: { errors, checkout: updatedCheckout }
        }
      } = await apolloClient.mutate<
        updateCheckoutLine,
        updateCheckoutLineVariables
      >({
        mutation: updateCheckoutLineQuery,
        variables: {
          checkoutId: checkoutID,
          lines
        }
      });
      apiError = !!errors.length;
      if (apiError) {
        this.setState({
          errors: [...errors],
          loading: false
        });
      } else {
        checkout.update({
          checkout: {
            ...checkout.checkout,
            lines: updatedCheckout.lines
          }
        });
      }
    }

    if (!apiError) {
      this.setState(prevState => {
        let newLines = lines.filter(({ quantity }) => !!quantity);
        const newLinesVariantIds = lines.map(({ variantId }) => variantId);
        newLines = prevState.lines.filter(
          ({ variantId }) => !newLinesVariantIds.includes(variantId)
        );
        lines = [...lines, ...newLines];
        localStorage.setItem("cart", JSON.stringify(lines));
        return { lines, loading: false };
      });
    }
  };

  add = (variantId, quantity = 1) => {
    const line = this.getLine(variantId);
    const newQuantity = line ? line.quantity + quantity : quantity;
    this.changeQuantity([{ variantId, quantity: newQuantity }]);
  };

  subtract = (variantId, quantity = 1) => {
    const line = this.getLine(variantId);
    const newQuantity = line ? line.quantity - quantity : quantity;
    this.changeQuantity([{ variantId, quantity: newQuantity }]);
  };

  clear = () => {
    this.setState({ lines: [], errors: [] });
    localStorage.removeItem(LocalStorageKeys.Cart);
  };

  clearErrors = () => this.setState({ errors: [] });

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

  remove = variantId => this.changeQuantity([{ variantId, quantity: 0 }]);

  render() {
    return (
      <CartContext.Provider value={this.state}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
