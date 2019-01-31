import * as React from "react";

import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "./context";
import { TypedGetCheckoutQuery } from "./queries";

enum LocalStorageKeys {
  Token = "checkoutToken"
}

class Provider extends React.Component<{}, CheckoutContextInterface> {
  providerContext = {};

  constructor(props) {
    super(props);

    this.state = {
      cardData: null,
      checkout: null,
      loading: !!this.getStoredToken(),
      shippingAsBilling: false
    };
  }

  getStoredToken = (): null | string =>
    localStorage.getItem(LocalStorageKeys.Token);

  getContext = (): CheckoutContextInterface => ({
    ...this.state,
    clear: this.clear,
    step: this.getCurrentStep(),
    update: this.update
  });

  getCurrentStep() {
    const { checkout, cardData } = this.state;

    if (!checkout) {
      return CheckoutStep.ShippingAddress;
    } else if (cardData) {
      return CheckoutStep.Review;
    } else if (checkout.billingAddress) {
      return CheckoutStep.Payment;
    } else if (checkout.shippingMethod) {
      return CheckoutStep.BillingAddress;
    } else if (checkout.availableShippingMethods.length) {
      return CheckoutStep.ShippingOption;
    }
    return CheckoutStep.ShippingAddress;
  }

  clear = () => {
    this.setState({
      cardData: null,
      checkout: null,
      shippingAsBilling: false,
      step: CheckoutStep.ShippingAddress
    });
    localStorage.removeItem(LocalStorageKeys.Token);
  };

  update = (checkoutData: CheckoutContextInterface) => {
    this.setState({ ...checkoutData, step: this.getCurrentStep() });
    if ("checkout" in checkoutData) {
      localStorage.setItem(LocalStorageKeys.Token, checkoutData.checkout.token);
    }
  };

  render() {
    const token = this.getStoredToken();
    const { checkout } = this.state;
    const provider = (
      <CheckoutContext.Provider value={this.getContext()}>
        {this.props.children}
      </CheckoutContext.Provider>
    );

    if (checkout) {
      return provider;
    }

    if (token) {
      return (
        <TypedGetCheckoutQuery
          displayLoader
          variables={{ token }}
          onCompleted={({ checkout }) =>
            this.setState({ checkout, loading: false })
          }
        >
          {() => provider}
        </TypedGetCheckoutQuery>
      );
    }
    return provider;
  }
}

export default Provider;
