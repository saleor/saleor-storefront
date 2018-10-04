import * as React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { CartSummary, Loader } from "..";
import { CREATE_CHECKOUT, GET_CHECKOUT } from "./queries";
import { default as Routes } from "./routes";

import "./scss/index.scss";

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
        <Query query={GET_CHECKOUT} variables={{ token }}>
          {({ loading, error, data: { checkout } }) => {
            const lines = checkout
              ? checkout.lines.edges.map(edge => edge.node)
              : [];
            if (loading) {
              return <Loader />;
            }
            if (error) {
              return `Error!: ${error}`;
            }
            console.log(checkout);
            return (
              <>
                <div className="checkout__grid__content">
                  <Routes matchUrl={url} />
                </div>
                <CartSummary
                  products={lines}
                  subtotal={checkout.subtotalPrice}
                  shippingPrice={checkout.shipping && checkout.shipping.price}
                  total={checkout.totalPrice}
                />
              </>
            );
          }}
        </Query>
      </div>
    </div>
  </div>
);

export default CheckoutApp;
