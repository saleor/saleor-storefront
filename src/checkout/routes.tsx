import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { NotFound } from "../components";
import {
  Billing,
  CheckoutInit,
  Payment,
  Review,
  Shipping,
  ShippingOptions
} from "./views";

// export const checkoutBaseUrl = token => `${ROOT_URL}${token}/`;
// export const checkoutShippingOptionsUrl = token =>
//   `${checkoutBaseUrl(token)}shipping-options/`;
// export const checkoutBillingUrl = token =>
//   `${checkoutBaseUrl(token)}billing-address/`;
// export const checkoutPaymentUrl = token => `${checkoutBaseUrl(token)}payment/`;
// export const checkoutReviewUrl = token => `${checkoutBaseUrl(token)}review/`;
export const baseUrl = "/checkout/";
export const shippingAddressUrl = `${baseUrl}shipping-address/`;
export const shippingOptionsUrl = `${baseUrl}shipping-options/`;
export const billingUrl = `${baseUrl}billing-address/`;
export const paymentUrl = `${baseUrl}payment/`;
export const reviewUrl = `${baseUrl}review/`;

export const Routes: React.SFC<{ token: string }> = ({ token }) => (
  <Switch>
    <Route exact path={baseUrl} component={CheckoutInit} />
    <Route path={shippingAddressUrl} component={Shipping} />
    <Route path={shippingOptionsUrl} component={ShippingOptions} />
    <Route path={billingUrl} component={Billing} />
    <Route path={paymentUrl} component={Payment} />
    <Route path={reviewUrl} component={Review} />
    <Route component={NotFound} />
  </Switch>
);
