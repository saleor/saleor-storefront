import { ApolloClient } from "apollo-client";
import * as React from "react";
import { Redirect } from "react-router";

import { CheckoutInterface } from "../../core/types";
import { ButtonProps, default as Button } from "../Button";
import { CartInterface } from "../CartProvider/context";
import { CheckoutContext } from "../CheckoutApp/context";
import { GET_CHECKOUT } from "../CheckoutApp/queries";
import {
  checkoutBaseUrl,
  checkoutBillingUrl,
  checkoutPaymentUrl,
  checkoutShippingOptionsUrl
} from "../CheckoutApp/routes";
import { CREATE_CHECKOUT } from "./queries";

export interface GoToCheckoutState {
  checkout?: CheckoutInterface;
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

  handleCheckoutCreation = async () => {
    const checkoutToken = localStorage.getItem("checkout");
    if (checkoutToken) {
      const { apolloClient } = this.props;
      let data: { [key: string]: any };
      const response = await apolloClient.query({
        query: GET_CHECKOUT,
        variables: {
          token: checkoutToken
        }
      });
      data = response.data;
      this.setState({
        checkout: data.checkout,
        checkoutToken,
        loading: false,
        redirect: true
      });
    } else {
      const {
        apolloClient,
        cart: { lines }
      } = this.props;
      this.setState({ loading: true });
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CHECKOUT,
        variables: {
          checkoutInput: {
            lines: lines.map(line => ({
              quantity: line.quantity,
              variantId: line.variantId
            }))
          }
        }
      });
      this.setState({
        checkout: data.checkoutCreate.checkout,
        checkoutToken: data.checkoutCreate.checkout.token,
        loading: false,
        redirect: true
      });
    }
  };

  getRedirection() {
    const { checkout } = this.state;
    let pathname;
    if (checkout.billingAddress) {
      pathname = checkoutPaymentUrl;
    } else if (checkout.shippingMethod) {
      pathname = checkoutBillingUrl;
    } else if (checkout.availableShippingMethods) {
      pathname = checkoutShippingOptionsUrl;
    } else {
      pathname = checkoutBaseUrl;
    }
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

  componentDidUpdate(prevProps, prevState) {
    const { checkoutToken } = this.state;
    if (checkoutToken) {
      localStorage.setItem("checkout", this.state.checkoutToken);
    } else {
      localStorage.removeItem("checkout");
    }
  }

  render = () => {
    const { children, cart, apolloClient, ...buttonProps } = this.props;
    if (this.state.loading) {
      return <Button {...buttonProps}>Loading</Button>;
    }
    if (this.state.checkoutToken && this.state.redirect) {
      this.setState({ redirect: false });
      return this.getRedirection();
    }
    return (
      <Button
        {...buttonProps}
        onClick={event => {
          this.handleCheckoutCreation();
          event.preventDefault();
        }}
      >
        {children}
      </Button>
    );
  };
}
