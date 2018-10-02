import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { App, CheckoutLogin } from "..";

export const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/checkout" component={CheckoutLogin} />
  </Switch>
);

export default Routes;
