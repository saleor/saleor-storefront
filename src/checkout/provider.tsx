import { ApolloClient } from "apollo-client";
import * as React from "react";

import { ApolloConsumer } from "react-apollo";
import { Loader } from "../components";
import { CartContext } from "../components/CartProvider/context";
import { CheckoutContext, CheckoutContextInterface } from "./context";
import { createCheckoutMutation, getCheckoutQuery } from "./queries";
import {
  createCheckout,
  createCheckout_checkoutCreate_checkout,
  createCheckoutVariables
} from "./types/createCheckout";
import {
  getCheckout,
  getCheckout_checkout,
  getCheckoutVariables
} from "./types/getCheckout";

class Provider extends React.Component<
  {
    lines: any;
    client: ApolloClient<any>;
    createOnMount: boolean;
  },
  CheckoutContextInterface & { checkoutToken: string | null }
> {
  static defaultProps = { createOnMount: true };
  localStorageTokenKey = "checkoutToken";

  constructor(props) {
    super(props);
    this.state = {
      cardData: null,
      checkout: null,
      checkoutToken: localStorage.getItem(this.localStorageTokenKey),
      clearCheckout: this.clearCheckout,
      loading: false,
      updateCheckout: this.updateCheckout
    };
  }

  async componentDidMount() {
    const { createOnMount } = this.props;

    if (createOnMount) {
      this.setState({ loading: true });
      const getCheckoutFn = !this.state.checkoutToken
        ? this.createCheckout
        : this.getCheckout;
      const checkout = await getCheckoutFn();
      this.setState({
        checkout,
        checkoutToken: checkout.token,
        loading: false
      });
      localStorage.setItem(this.localStorageTokenKey, checkout.token);
    }
  }

  updateCheckout = checkoutData => this.setState(checkoutData);

  clearCheckout = () => {
    this.setState({ cardData: null, checkout: null });
    localStorage.removeItem(this.localStorageTokenKey);
  };

  getCheckout = async (): Promise<getCheckout_checkout> => {
    const { checkoutToken } = this.state;
    const {
      data: { checkout }
    } = await this.props.client.query<getCheckout, getCheckoutVariables>({
      query: getCheckoutQuery,
      variables: { token: checkoutToken }
    });

    return checkout;
  };

  createCheckout = async (): Promise<
    createCheckout_checkoutCreate_checkout
  > => {
    const { lines } = this.props;
    const { data } = await this.props.client.mutate<
      createCheckout,
      createCheckoutVariables
    >({
      mutation: createCheckoutMutation,
      variables: { checkoutInput: { lines } }
    });
    return data.checkoutCreate.checkout;
  };

  render() {
    return (
      <CheckoutContext.Provider value={this.state}>
        {this.props.children}
      </CheckoutContext.Provider>
    );
  }
}

const WrappedProvider: React.FC = props => (
  <CartContext.Consumer>
    {({ lines }) => (
      <ApolloConsumer>
        {client => <Provider lines={lines} client={client} {...props} />}
      </ApolloConsumer>
    )}
  </CartContext.Consumer>
);

export default WrappedProvider;
