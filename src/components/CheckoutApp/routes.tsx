import * as React from "react";
import { Route } from "react-router-dom";

import {
  CheckoutBilling,
  CheckoutPayment,
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
  </>
);

export default Routes;
