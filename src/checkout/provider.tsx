import * as React from "react";

import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "./context";
import { TypedGetCheckoutQuery } from "./queries";

class Provider extends React.Component<{}, CheckoutContextInterface> {
  storageTokenKey = "checkoutToken";
  storageStepKey = "checkoutStep";
  providerContext = {};

  constructor(props) {
    super(props);
    const storedStep = localStorage.getItem(
      this.storageStepKey
    ) as CheckoutStep;

    this.state = {
      cardData: null,
      checkout: null,
      loading: !!this.storedToken,
      shippingAsBilling: false,
      step: storedStep || CheckoutStep.ShippingAddress
    };
  }

  get storedToken(): null | string {
    return localStorage.getItem(this.storageTokenKey);
  }

  get getContext(): CheckoutContextInterface {
    return {
      ...this.state,
      clear: this.clear,
      update: this.update
    };
  }

  clear = () => {
    this.setState({
      cardData: null,
      checkout: null,
      shippingAsBilling: false,
      step: CheckoutStep.ShippingAddress
    });
    localStorage.removeItem(this.storageStepKey);
    localStorage.removeItem(this.storageTokenKey);
  };

  update = (checkoutData: CheckoutContextInterface) => {
    this.setState(checkoutData);
    if ("step" in checkoutData) {
      localStorage.setItem(this.storageStepKey, checkoutData.step);
    }
    if ("checkout" in checkoutData) {
      localStorage.setItem(this.storageTokenKey, checkoutData.checkout.token);
    }
  };

  render() {
    const { checkout } = this.state;
    const provider = (
      <CheckoutContext.Provider value={{ ...this.getContext }}>
        {this.props.children}
      </CheckoutContext.Provider>
    );

    if (checkout) {
      return provider;
    }

    if (this.storedToken) {
      return (
        <TypedGetCheckoutQuery
          variables={{ token: this.storedToken }}
          onCompleted={({ checkout }) => {
            this.setState({ checkout, loading: false });
          }}
        >
          {() => provider}
        </TypedGetCheckoutQuery>
      );
    }
    return provider;
  }
}

export default Provider;
