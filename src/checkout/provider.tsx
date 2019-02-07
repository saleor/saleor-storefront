import * as React from "react";

import { UserContextInterface } from "../components/User/context";
import { User } from "../components/User/types/User";
import {
  CheckoutContext,
  CheckoutContextInterface,
  CheckoutStep
} from "./context";
import { TypedGetCheckoutQuery, TypedGetUserCheckoutQuery } from "./queries";

enum LocalStorageKeys {
  Token = "checkoutToken"
}

class Provider extends React.Component<
  { user: UserContextInterface },
  CheckoutContextInterface
> {
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
    this.setState({ ...checkoutData, step: this.getCurrentStep() }, () => {
      if ("checkout" in checkoutData) {
        this.setCheckoutToken();
      }
    });
  };

  setCheckoutToken = () => {
    localStorage.setItem(LocalStorageKeys.Token, this.state.checkout.token);
  };

  render() {
    const token = this.getStoredToken();
    const {
      user: { user, loading: userLoading }
    } = this.props;
    const { checkout: stateCheckout } = this.state;
    const skipUserCheckoutFetch = !!(userLoading || !user);

    return (
      <TypedGetUserCheckoutQuery
        alwaysRender
        displayLoader={false}
        skip={skipUserCheckoutFetch}
        onCompleted={({ me: { checkout } }) => {
          if (checkout && !stateCheckout) {
            this.setState({ checkout, loading: false }, this.setCheckoutToken);
          }
        }}
      >
        {({ loading: userCheckoutLoading }) => {
          const skip = !(
            userCheckoutLoading ||
            userLoading ||
            !token ||
            stateCheckout ||
            user
          );

          return (
            <TypedGetCheckoutQuery
              alwaysRender
              displayLoader={false}
              variables={{ token }}
              skip={skip}
              onCompleted={({ checkout }) => {
                if (checkout && !stateCheckout) {
                  this.setState(
                    { checkout, loading: false },
                    this.setCheckoutToken
                  );
                }
              }}
            >
              {() => (
                <CheckoutContext.Provider value={this.getContext()}>
                  {this.props.children}
                </CheckoutContext.Provider>
              )}
            </TypedGetCheckoutQuery>
          );
        }}
      </TypedGetUserCheckoutQuery>
    );
  }
}

export default Provider;
