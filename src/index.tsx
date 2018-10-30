import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { RetryLink } from "apollo-link-retry";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { App, CheckoutApp, UserProvider } from "./components";
import OverlayProvider from "./components/Overlay";
import { OverlayContext, OverlayType } from "./components/Overlay/context";
import ShopProvider from "./components/ShopProvider";
import {
  authLink,
  invalidTokenLinkWithTokenHandlerComponent
} from "./core/auth";

const devMode = process.env.NODE_ENV !== "production";
const {
  component: UserProviderWithTokenHandler,
  link: invalidTokenLink
} = invalidTokenLinkWithTokenHandlerComponent(UserProvider);

const link = ApolloLink.from([
  invalidTokenLink,
  authLink,
  new RetryLink(),
  new HttpLink({
    uri: process.env.APP_GRAPHQL_URL || "/graphql/"
  })
]);

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(obj);
  }
});

const startApp = async () => {
  await persistCache({
    cache,
    debug: devMode,
    storage: window.localStorage
  });
  const apolloClient = new ApolloClient({
    cache,
    link
  });
  render(
    <BrowserRouter>
      <ShopProvider apolloClient={apolloClient}>
        <OverlayProvider>
          <OverlayContext.Consumer>
            {({ show }) => (
              <UserProviderWithTokenHandler
                apolloClient={apolloClient}
                onUserLogin={() =>
                  show(OverlayType.message, null, {
                    title: "You are logged in"
                  })
                }
                onUserLogout={() =>
                  show(OverlayType.message, null, {
                    title: "You are logged out"
                  })
                }
                refreshUser
              >
                <ApolloProvider client={apolloClient}>
                  <Switch>
                    <Route path="/checkout/:token/" component={CheckoutApp} />
                    <Route component={App} />
                  </Switch>
                </ApolloProvider>
              </UserProviderWithTokenHandler>
            )}
          </OverlayContext.Consumer>
        </OverlayProvider>
      </ShopProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

startApp();
