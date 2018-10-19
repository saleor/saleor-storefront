import * as React from "react";
import { Route } from "react-router-dom";

import {
  CheckoutBilling,
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
  CheckoutShippingOptions
} from "..";

const Routes: React.SFC<{ matchUrl: string }> = ({ matchUrl }) => (
  <>
    <Route exact path={`${matchUrl}`} component={CheckoutShipping} />
    <Route
      path={`${matchUrl}/shipping-options/`}
      component={CheckoutShippingOptions}
    />
    <Route path={`${matchUrl}/billing-address/`} component={CheckoutBilling} />
    <Route path={`${matchUrl}/payment/`} component={CheckoutPayment} />
    <Route path={`${matchUrl}/review/`} component={CheckoutReview} />
  </>
);

export default Routes;
