import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import urljoin from "url-join";

import { createBrowserHistory } from "history";
import { App, CheckoutApp, UserProvider } from "./components";
import OverlayProvider from "./components/Overlay";
import { OverlayContext, OverlayType } from "./components/Overlay/context";
import ShopProvider from "./components/ShopProvider";
import {
  authLink,
  invalidTokenLinkWithTokenHandlerComponent
} from "./core/auth";

const API_URL = urljoin(process.env.BACKEND_URL || "", "/graphql/");

const {
  component: UserProviderWithTokenHandler,
  link: invalidTokenLink
} = invalidTokenLinkWithTokenHandlerComponent(UserProvider);

const link = ApolloLink.from([
  invalidTokenLink,
  authLink,
  new RetryLink(),
  new BatchHttpLink({ uri: API_URL })
]);

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(obj);
  }
});

const history = createBrowserHistory();
history.listen((location, action) => {
  if (["PUSH"].includes(action)) {
    window.scroll({
      behavior: "smooth",
      top: 0
    });
  }
});

const startApp = async () => {
  await persistCache({
    cache,
    storage: window.localStorage
  });
  const apolloClient = new ApolloClient({
    cache,
    link
  });
  render(
    <Router history={history}>
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
    </Router>,
    document.getElementById("root")
  );
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

startApp();
