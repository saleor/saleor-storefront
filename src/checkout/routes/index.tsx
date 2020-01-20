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
    <Route exact path={baseUrl} component={CheckoutRoute} />
    <Route path={shippingAddressUrl} component={ShippingRoute} />
    <Route path={shippingOptionsUrl} component={ShippingOptionsRoute} />
    <Route path={billingUrl} component={BillingRoute} />
    <Route path={paymentUrl} component={PaymentRoute} />
    <Route path={reviewUrl} component={ReviewRoute} />
    <Route component={NotFound} />
  </Switch>
);
