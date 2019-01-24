import { ApolloClient } from "apollo-client";
import * as React from "react";
import { Redirect } from "react-router";

import { maybe } from "../../core/utils";
import { ButtonProps, default as Button } from "../Button";
import { CartInterface } from "../CartProvider/context";
import { CheckoutContext } from "../CheckoutApp/context";
import { getCheckoutQuery } from "../CheckoutApp/queries";
import {
  checkoutBaseUrl,
  checkoutBillingUrl,
  checkoutPaymentUrl,
  checkoutShippingOptionsUrl
} from "../CheckoutApp/routes";
import { Checkout } from "../CheckoutApp/types/Checkout";
import {
  getCheckout,
  getCheckoutVariables
} from "../CheckoutApp/types/getCheckout";
// import { baseUrl as checkoutUrl } from "../../checkout/r"

export interface GoToCheckoutState {
  checkout?: Checkout;
  checkoutToken: string;
  loading: boolean;
  redirect: boolean;
}

export interface GoToCheckoutProps extends ButtonProps {
  children: any;
  apolloClient: ApolloClient<any>;
  cart?: CartInterface;
}

export class GoToCheckout extends React.Component<
  GoToCheckoutProps,
  GoToCheckoutState
> {
  constructor(props) {
    super(props);
    let checkoutToken;
    try {
      checkoutToken = localStorage.getItem("checkout");
    } catch {
      checkoutToken = null;
    }
    this.state = {
      checkoutToken,
      loading: false,
      redirect: false
    };
  }

  // handleCheckoutCreation = async () => {
  //   const checkoutToken = localStorage.getItem("checkout");
  //   if (checkoutToken) {
  //     localStorage.setItem("checkout", checkoutToken);

  //     const { apolloClient } = this.props;
  //     const { data } = await apolloClient.query<
  //       getCheckout,
  //       getCheckoutVariables
  //     >({
  //       query: getCheckoutQuery,
  //       variables: {
  //         token: checkoutToken
  //       }
  //     });
  //     this.setState({
  //       checkout: data.checkout,
  //       checkoutToken,
  //       loading: false,
  //       redirect: true
  //     });
  //   } else {
  //     const {
  //       apolloClient,
  //       cart: { lines }
  //     } = this.props;
  //     this.setState({ loading: true });
  //     const { data } = await apolloClient.mutate<
  //       createCheckout,
  //       createCheckoutVariables
  //     >({
  //       mutation: createCheckoutQuery,
  //       variables: {
  //         checkoutInput: {
  //           lines: lines.map((line: { quantity; variantId }) => ({
  //             quantity: line.quantity,
  //             variantId: line.variantId
  //           }))
  //         }
  //       }
  //     });
  //     localStorage.setItem("checkout", data.checkoutCreate.checkout.token);
  //     this.setState({
  //       checkout: data.checkoutCreate.checkout,
  //       checkoutToken: data.checkoutCreate.checkout.token,
  //       loading: false,
  //       redirect: true
  //     });
  //   }
  // };

  getRedirection() {
    const { checkout } = this.state;
    const shippingAvailable = maybe(
      () => checkout.availableShippingMethods.length
    );
    let pathname;

    if (checkout.billingAddress) {
      pathname = checkoutPaymentUrl(this.state.checkoutToken);
    } else if (checkout.shippingMethod) {
      pathname = checkoutBillingUrl(this.state.checkoutToken);
    } else if (shippingAvailable) {
      pathname = checkoutShippingOptionsUrl(this.state.checkoutToken);
    } else {
      pathname = checkoutBaseUrl(this.state.checkoutToken);
    }
    // pathname = checkoutBaseUrl(this.state.checkoutToken);

    if (pathname) {
      return (
        <CheckoutContext.Consumer>
          {({ updateCheckout }) => {
            updateCheckout({ checkout });
            return <Redirect to={pathname} />;
          }}
        </CheckoutContext.Consumer>
      );
    }
  }

  componentDidUpdate() {
    if (this.state.checkoutToken && this.state.redirect) {
      this.setState({ redirect: false });
    }
  }

  render = () => {
    const { children, cart, apolloClient, ...buttonProps } = this.props;

    if (this.state.loading) {
      return (
        <Button disabled {...buttonProps}>
          Loading
        </Button>
      );
    }

    if (this.state.checkoutToken && this.state.redirect) {
      return this.getRedirection();
    }

    return (
      <Button
        {...buttonProps}
        onClick={event => {
          // this.handleCheckoutCreation();
          event.preventDefault();
        }}
      >
        {children}
      </Button>
    );
  };
}
