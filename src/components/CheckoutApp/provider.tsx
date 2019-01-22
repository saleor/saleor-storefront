import { mediumScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

import { ApolloClient } from "apollo-client";
import * as React from "react";

import {
  CheckoutContext,
  CheckoutContextInterface,
  defaultContext
} from "./context";
import { TypedGetCheckoutQuery } from "./queries";

class Provider extends React.Component<
  {
    children: any;
    apolloClient: ApolloClient<any>;
    token: string;
    url: string;
  },
  CheckoutContextInterface
> {
  constructor(props) {
    super(props);
    this.state = {
      cardData: null,
      checkout: null,
      clearCheckout: this.clearCheckout,
      loading: false,
      updateCheckout: this.updateCheckout
    };
  }

  updateCheckout = checkoutData => {
    this.setState(checkoutData);
  };

  clearCheckout = () => {
    this.setState({ cardData: null, checkout: null });
  };

  render() {
    const { children } = this.props;
    return (
      <TypedGetCheckoutQuery
        displayLoader={false}
        displayError={false}
        variables={{ token: this.props.token }}
        // onCompleted={args => console.log(args)}
      >
        {({ data, loading }) => (
          <CheckoutContext.Provider
            value={{
              ...defaultContext,
              ...this.state,
              checkout: data.checkout,
              loading
            }}
          >
            {children}
          </CheckoutContext.Provider>
        )}
      </TypedGetCheckoutQuery>
    );
  }
}

export default Provider;
