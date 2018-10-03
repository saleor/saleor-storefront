import * as React from "react";
import { Route } from "react-router-dom";

import { CheckoutLogin } from "..";

const Routes: React.SFC<{ matchUrl: string }> = ({ matchUrl }) => (
  <Route path={`${matchUrl}/login`} component={CheckoutLogin} />
);

export default Routes;
