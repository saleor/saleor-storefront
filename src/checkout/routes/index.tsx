import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { NotFound } from "../../components";
import { Billing, Payment, Review, Shipping, ShippingOptions } from "../views";
import { CheckoutRouteDispatcher } from "./CheckoutRouteDispatcher";

export const baseUrl = "/checkout/";
export const shippingAddressBaseUrl = `shipping-address/`;
export const shippingOptionsBaseUrl = `shipping-options/`;
export const billingBaseUrl = `billing-address/`;
export const paymentBaseUrl = `payment/`;
export const reviewBaseUrl = `review/`;
export const shippingAddressUrl = `${baseUrl}${shippingAddressBaseUrl}:token?/`;
export const shippingOptionsUrl = `${baseUrl}${shippingOptionsBaseUrl}:token?/`;
export const billingUrl = `${baseUrl}${billingBaseUrl}:token?/`;
export const paymentUrl = `${baseUrl}${paymentBaseUrl}:token?/`;
export const reviewUrl = `${baseUrl}${reviewBaseUrl}:token?/`;

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={baseUrl} component={CheckoutRouteDispatcher} />
    <Route path={shippingAddressUrl} component={Shipping} />
    <Route path={shippingOptionsUrl} component={ShippingOptions} />
    <Route path={billingUrl} component={Billing} />
    <Route path={paymentUrl} component={Payment} />
    <Route path={reviewUrl} component={Review} />
    <Route component={NotFound} />
  </Switch>
);
