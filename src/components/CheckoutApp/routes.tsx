import * as React from "react";
import { Route } from "react-router-dom";

import { CheckoutShipping } from "..";

const Routes: React.SFC<{ matchUrl: string }> = ({ matchUrl }) => (
  <Route path={`${matchUrl}`} component={CheckoutShipping} />
);

export default Routes;
