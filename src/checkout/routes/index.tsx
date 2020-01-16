import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { NotFound } from "../../components";
import { Payment, Review, Shipping, ShippingOptions } from "../views";
import { BillingRoute } from "./BillingRoute";
import { CheckoutRoute } from "./CheckoutRoute";

export const baseUrl = "/checkout/";
export const shippingAddressUrl = `${baseUrl}shipping-address/:token?/`;
export const shippingOptionsUrl = `${baseUrl}shipping-options/:token?/`;
export const billingUrl = `${baseUrl}billing-address/:token?/`;
export const paymentUrl = `${baseUrl}payment/:token?/`;
export const reviewUrl = `${baseUrl}review/:token?/`;

/*
TODO: make middleware route components for rest of components in routes...
*/

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={baseUrl} component={CheckoutRoute} />
    <Route path={shippingAddressUrl} component={Shipping} />
    <Route path={shippingOptionsUrl} component={ShippingOptions} />
    <Route path={billingUrl} component={BillingRoute} />
    <Route path={paymentUrl} component={Payment} />
    <Route path={reviewUrl} component={Review} />
    <Route component={NotFound} />
  </Switch>
);
