import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import * as React from "react";
import { render } from "react-dom";

import { App } from "./components";

const devMode = process.env.NODE_ENV !== "production";
const clientUri = process.env.APP_GRAPHQL_URL || "/graphql/";
const cache = new InMemoryCache();

persistCache({
  cache,
  debug: devMode,
  storage: window.localStorage
});

const apolloClient = new ApolloClient({
  cache,
  uri: clientUri
});

render(<App apolloClient={apolloClient} />, document.getElementById("root"));
