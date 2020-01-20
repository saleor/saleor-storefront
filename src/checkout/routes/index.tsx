import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { NotFound } from "../../components";
import { BillingRoute } from "./BillingRoute";
import { CheckoutRoute } from "./CheckoutRoute";
import { PaymentRoute } from "./PaymentRoute";
import { ReviewRoute } from "./ReviewRoute";
import { ShippingOptionsRoute } from "./ShippingOptionsRoute";
import { ShippingRoute } from "./ShippingRoute";

export const baseUrl = "/checkout/";
export const shippingAddressUrl = `${baseUrl}shipping-address/:token?/`;
export const shippingOptionsUrl = `${baseUrl}shipping-options/:token?/`;
export const billingUrl = `${baseUrl}billing-address/:token?/`;
export const paymentUrl = `${baseUrl}payment/:token?/`;
export const reviewUrl = `${baseUrl}review/:token?/`;

export const Routes: React.FC = () => (
  <Switch>
    <Route exact path={baseUrl} component={CheckoutRoute} />
    <Route path={shippingAddressUrl} component={ShippingRoute} />
    <Route path={shippingOptionsUrl} component={ShippingOptionsRoute} />
    <Route path={billingUrl} component={BillingRoute} />
    <Route path={paymentUrl} component={PaymentRoute} />
    <Route path={reviewUrl} component={ReviewRoute} />
    <Route component={NotFound} />
  </Switch>
);
