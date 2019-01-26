import * as React from "react";
import { Route, Switch } from "react-router-dom";

import {
  CheckoutBilling,
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
  CheckoutShippingOptions,
  NotFound
} from "..";

export const checkoutBaseUrl = token => `/checkout/${token}/`;
export const checkoutShippingOptionsUrl = token =>
  `${checkoutBaseUrl(token)}shipping-options/`;
export const checkoutBillingUrl = token =>
  `${checkoutBaseUrl(token)}billing-address/`;
export const checkoutPaymentUrl = token => `${checkoutBaseUrl(token)}payment/`;
export const checkoutReviewUrl = token => `${checkoutBaseUrl(token)}review/`;

export const Routes: React.SFC<{ token: string }> = ({ token }) => (
  <Switch>
    <Route exact path={checkoutBaseUrl(token)} component={CheckoutShipping} />
    <Route
      path={checkoutShippingOptionsUrl(token)}
      component={CheckoutShippingOptions}
    />
    <Route path={checkoutBillingUrl(token)} component={CheckoutBilling} />
    <Route path={checkoutPaymentUrl(token)} component={CheckoutPayment} />
    <Route path={checkoutReviewUrl(token)} component={CheckoutReview} />
    <Route component={NotFound} />
  </Switch>
);
