import { ApolloClient } from "apollo-client";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { App, CheckoutApp } from "..";

interface GlobalRoutingProps {
  apolloClient: ApolloClient<any>;
}

const GlobalRouting: React.SFC<GlobalRoutingProps> = ({ apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Switch>
        <Route path="/checkout" component={CheckoutApp} />
        <Route component={App} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default GlobalRouting;
