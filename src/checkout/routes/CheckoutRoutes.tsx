import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { NotFound } from "../../components";
import { Billing, Payment, Review, Shipping, ShippingOptions } from "../views";
import { CheckoutRouteDispatcher } from "./CheckoutRouteDispatcher";

import {
  baseUrl,
  billingUrl,
  paymentUrl,
  reviewUrl,
  shippingAddressUrl,
  shippingOptionsUrl,
} from ".";

export const CheckoutRoutes: React.FC = () => (
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
