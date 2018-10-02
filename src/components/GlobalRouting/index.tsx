import { ApolloClient } from "apollo-client";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";

interface GlobalRoutingProps {
  apolloClient: ApolloClient<any>;
}

const GlobalRouting: React.SFC<GlobalRoutingProps> = ({ apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>
);

export default GlobalRouting;
