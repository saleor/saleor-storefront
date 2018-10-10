import { ApolloClient } from "apollo-client";
import * as React from "react";
import { ApolloConsumer, Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { CartSummary, Loader } from "..";
import { CheckoutInterface } from "../../core/types";
import { CheckoutContext } from "./context";
import { GET_CHECKOUT } from "./queries";
import { default as Routes } from "./routes";

import "./scss/index.scss";

export class CheckoutProvider extends React.Component<
  {
    children: any;
    apolloClient: ApolloClient<any>;
    token: string;
  },
  { checkout: CheckoutInterface }
> {
  constructor(props) {
    super(props);
    this.state = {
      checkout: null
    };
  }

  async componentWillMount() {
    const { data } = await this.props.apolloClient.query({
      query: GET_CHECKOUT,
      variables: { token: this.props.token }
    });

    this.setState(data);
  }

  render() {
    const { children } = this.props;
    return (
      <CheckoutContext.Provider value={this.state}>
        {children}
      </CheckoutContext.Provider>
    );
  }
}

const CheckoutApp: React.SFC<RouteComponentProps<{ match; token }>> = ({
  match: {
    url,
    params: { token = "" }
  }
}) => (
  <div className="checkout">
    <div className="checkout__menu">
      <div className="checkout__menu__bar">
        <ReactSVG path="../../images/logo.svg" />
      </div>
      <Link to="/">Return to shopping</Link>
    </div>
    <div className="container">
      <div className="checkout__grid">
        <ApolloConsumer>
          {client => (
            <CheckoutProvider apolloClient={client} token={token}>
              <div className="checkout__grid__content">
                <Routes matchUrl={url} />
              </div>
              <CartSummary />
            </CheckoutProvider>
          )}
        </ApolloConsumer>
      </div>
    </div>
  </div>
);

export default CheckoutApp;
