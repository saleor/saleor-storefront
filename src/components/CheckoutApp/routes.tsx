import * as React from "react";
import { Route } from "react-router-dom";

import {
  CheckoutBilling,
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
  CheckoutShippingOptions
} from "..";

const checkoutToken = localStorage.getItem("checkout");

export const checkoutBaseUrl = `/checkout/${checkoutToken}/`;
export const checkoutShippingOptionsUrl = `${checkoutBaseUrl}shipping-options/`;
export const checkoutBillingUrl = `${checkoutBaseUrl}billing-address/`;
export const checkoutPaymentUrl = `${checkoutBaseUrl}payment/`;
export const checkoutReviewUrl = `${checkoutBaseUrl}review/`;

export const Routes: React.SFC = () => (
  <>
    <Route exact path={checkoutBaseUrl} component={CheckoutShipping} />
    <Route
      path={checkoutShippingOptionsUrl}
      component={CheckoutShippingOptions}
    />
    <Route path={checkoutBillingUrl} component={CheckoutBilling} />
    <Route path={checkoutPaymentUrl} component={CheckoutPayment} />
    <Route path={checkoutReviewUrl} component={CheckoutReview} />
  </>
);
