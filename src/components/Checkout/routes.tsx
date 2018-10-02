import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { CheckoutLogin } from "..";

const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/checkout" component={CheckoutLogin} />
  </Switch>
);

export default Routes;
