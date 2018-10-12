import * as React from "react";
import { Route } from "react-router-dom";

import { CheckoutBilling, CheckoutShipping, CheckoutShippingOptions } from "..";

const Routes: React.SFC<{ matchUrl: string }> = ({ matchUrl }) => (
  <>
    <Route exact path={`${matchUrl}`} component={CheckoutShipping} />
    <Route
      path={`${matchUrl}/shipping-options/`}
      component={CheckoutShippingOptions}
    />
    <Route path={`${matchUrl}/billing-address/`} component={CheckoutBilling} />
  </>
);

export default Routes;
