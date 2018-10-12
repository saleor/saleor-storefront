import { ApolloClient } from "apollo-client";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
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
    url: string;
  },
  { checkout: CheckoutInterface; loading: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      checkout: null,
      loading: false
    };
  }

  getCheckout = async () => {
    this.setState({ loading: true });
    const { data } = await this.props.apolloClient.query({
      fetchPolicy: "network-only",
      query: GET_CHECKOUT,
      variables: { token: this.props.token }
    });
    this.setState({ ...data, loading: false });
  };

  componentWillMount() {
    this.getCheckout();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.getCheckout();
    }
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
            <CheckoutProvider apolloClient={client} token={token} url={url}>
              <CheckoutContext.Consumer>
                {({ loading }) =>
                  loading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="checkout__grid__content">
                        <Routes matchUrl={url} />
                      </div>
                      <CartSummary />
                    </>
                  )
                }
              </CheckoutContext.Consumer>
            </CheckoutProvider>
          )}
        </ApolloConsumer>
      </div>
    </div>
  </div>
);

export default CheckoutApp;
