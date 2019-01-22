import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { NotFound } from "../components";
import {
  Billing,
  CheckoutCreation,
  Payment,
  Review,
  Shipping,
  ShippingOptions
} from "./views";

const ROOT_URL = "/checkout/";

export const checkoutBaseUrl = token => `${ROOT_URL}${token}/`;
export const checkoutShippingOptionsUrl = token =>
  `${checkoutBaseUrl(token)}shipping-options/`;
export const checkoutBillingUrl = token =>
  `${checkoutBaseUrl(token)}billing-address/`;
export const checkoutPaymentUrl = token => `${checkoutBaseUrl(token)}payment/`;
export const checkoutReviewUrl = token => `${checkoutBaseUrl(token)}review/`;

export const Routes: React.SFC<{ token: string }> = ({ token }) => (
  <Switch>
    <Route exact path={ROOT_URL} component={CheckoutCreation} />
    <Route exact path={checkoutBaseUrl(token)} component={Shipping} />
    <Route
      path={checkoutShippingOptionsUrl(token)}
      component={ShippingOptions}
    />
    <Route path={checkoutBillingUrl(token)} component={Billing} />
    <Route path={checkoutPaymentUrl(token)} component={Payment} />
    <Route path={checkoutReviewUrl(token)} component={Review} />
    <Route component={NotFound} />
  </Switch>
);
