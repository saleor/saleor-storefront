import { ApolloClient } from "apollo-client";
import * as React from "react";

import { ApolloConsumer } from "react-apollo";
import { CartContext } from "../components/CartProvider/context";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutCreateData,
  CheckoutStep
} from "./context";
import { createCheckoutMutation, getCheckoutQuery } from "./queries";
import {
  createCheckout,
  createCheckout_checkoutCreate,
  createCheckoutVariables
} from "./types/createCheckout";
import {
  getCheckout,
  getCheckout_checkout,
  getCheckoutVariables
} from "./types/getCheckout";

// TODO
// Create on item addition to cart
interface ProviderProps {
  lines: any;
  client: ApolloClient<any>;
}

class Provider extends React.Component<
  ProviderProps,
  CheckoutContextInterface
> {
  storageTokenKey = "checkoutToken";
  storageCheckoutStepKey = "checkoutStep";

  constructor(props: ProviderProps) {
    super(props);
    const storedCheckoutToken = localStorage.getItem(this.storageTokenKey);
    const storedStep = localStorage.getItem(
      this.storageCheckoutStepKey
    ) as CheckoutStep;

    this.state = {
      cardData: null,
      checkout: null,
      checkoutToken: storedCheckoutToken,
      clear: this.clear,
      create: this.create,
      errors: [],
      loading: !!storedCheckoutToken,
      shippingAsBilling: false,
      step: storedStep || CheckoutStep.ShippingAddress,
      update: this.update
    };
  }

  /**
   * When token is stored in the localstorage, get the checkout from the API.
   */
  componentDidMount() {
    if (this.state.checkoutToken) {
      this.get();
    }
  }

  /**
   * Clears existing checkout data from the state.
   */
  clear = () => {
    this.setState({
      cardData: null,
      checkout: null,
      shippingAsBilling: false,
      step: CheckoutStep.ShippingAddress
    });
    localStorage.removeItem(this.storageTokenKey);
    localStorage.removeItem(this.storageCheckoutStepKey);
  };

  /**
   * Get existing checkout.
   */
  get = async (): Promise<getCheckout_checkout> => {
    this.setState({ loading: true });
    const { checkoutToken } = this.state;
    const {
      data: { checkout }
    } = await this.props.client.query<getCheckout, getCheckoutVariables>({
      query: getCheckoutQuery,
      variables: { token: checkoutToken }
    });
    localStorage.setItem(this.storageTokenKey, checkout.token);
    this.setState({ checkout, checkoutToken: checkout.token, loading: false });
    return checkout;
  };

  /**
   * Create new checkout.
   */
  create = async (
    checkoutInput?: CheckoutCreateData
  ): Promise<createCheckout_checkoutCreate | null> => {
    this.setState({ loading: true, errors: [] });
    const { lines } = this.props;
    const {
      data: { checkoutCreate }
    } = await this.props.client.mutate<createCheckout, createCheckoutVariables>(
      {
        mutation: createCheckoutMutation,
        variables: { checkoutInput: { lines, ...checkoutInput } }
      }
    );
    const { checkout, errors } = checkoutCreate;

    if (checkout) {
      localStorage.setItem(this.storageTokenKey, checkout.token);
    }
    this.setState({
      checkout,
      errors,
      loading: false,
      ...(checkout && { checkoutToken: checkout.token })
    });
    return checkoutCreate;
  };

  update = (checkoutData: CheckoutContextInterface) =>
    this.setState(checkoutData);

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
