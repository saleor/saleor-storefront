import * as React from "react";
import { Route } from "react-router-dom";

import { CheckoutShipping, CheckoutShippingOptions } from "..";

const Routes: React.SFC<{ matchUrl: string }> = ({ matchUrl }) => (
  <>
    <Route exact path={`${matchUrl}`} component={CheckoutShipping} />
    <Route
      path={`${matchUrl}/shipping-options/`}
      component={CheckoutShippingOptions}
    />
  </>
);

export default Routes;
