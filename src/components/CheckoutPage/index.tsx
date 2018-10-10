import { ApolloClient } from "apollo-client";
import * as React from "react";
import { Redirect } from "react-router";

import { ButtonProps, default as Button } from "../Button";
import { CartInterface } from "../CartProvider/context";
import { CREATE_CHECKOUT } from "./queries";

import "./scss/index.scss";

export interface GoToCheckoutState {
  checkoutToken: string;
  loading: boolean;
  redirect: boolean;
}

export interface GoToCheckoutProps extends ButtonProps {
  children: any;
  apolloClient: ApolloClient<any>;
  cart: CartInterface;
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
    const {
      apolloClient,
      cart: { lines }
    } = this.props;
    if (checkoutToken) {
      this.setState({ redirect: true, loading: false, checkoutToken });
    } else {
      this.setState({ loading: true });
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CHECKOUT,
        variables: { checkoutInput: { lines } }
      });
      this.setState({
        checkoutToken: data.checkoutCreate.checkout.token,
        loading: false,
        redirect: true
      });
    }
  };

  getRedirection() {
    return <Redirect to={`/checkout/${this.state.checkoutToken}/`} />;
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
