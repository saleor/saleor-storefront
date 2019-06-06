import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { RetryLink } from "apollo-link-retry";
import * as React from "react";
import { positions, Provider as AlertProvider, useAlert } from "react-alert";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import urljoin from "url-join";

import { createBrowserHistory } from "history";

import { App } from "./app";
import CheckoutApp from "./checkout";
import { CheckoutContext } from "./checkout/context";
import CheckoutProvider from "./checkout/provider";
import { baseUrl as checkoutBaseUrl } from "./checkout/routes";

import {
  NotificationTemplate,
  OverlayProvider,
  UserProvider
} from "./components";

import CartProvider from "./components/CartProvider";
import ShopProvider from "./components/ShopProvider";
import { UserContext } from "./components/User/context";

import {
  authLink,
  invalidTokenLinkWithTokenHandlerComponent
} from "./core/auth";

const API_URL = urljoin(process.env.BACKEND_URL || "/", "/graphql/");

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
history.listen((_location, action) => {
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

  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500
  };

  const Root = () => {
    const alert = useAlert();

    return (
      <Router history={history}>
        <ApolloProvider client={apolloClient}>
          <ShopProvider>
            <OverlayProvider>
              <UserProviderWithTokenHandler
                apolloClient={apolloClient}
                onUserLogin={() =>
                  alert.show(
                    {
                      title: "You are now logged in"
                    },
                    { type: "success" }
                  )
                }
                onUserLogout={() =>
                  alert.show(
                    {
                      title: "You are now logged out"
                    },
                    { type: "success" }
                  )
                }
                refreshUser
              >
                <UserContext.Consumer>
                  {user => (
                    <CheckoutProvider user={user}>
                      <CheckoutContext.Consumer>
                        {checkout => (
                          <CartProvider
                            checkout={checkout}
                            apolloClient={apolloClient}
                          >
                            <Switch>
                              <Route
                                path={checkoutBaseUrl}
                                component={CheckoutApp}
                              />
                              <Route component={App} />
                            </Switch>
                          </CartProvider>
                        )}
                      </CheckoutContext.Consumer>
                    </CheckoutProvider>
                  )}
                </UserContext.Consumer>
              </UserProviderWithTokenHandler>
            </OverlayProvider>
          </ShopProvider>
        </ApolloProvider>
      </Router>
    );
  };

  render(
    <AlertProvider template={NotificationTemplate} {...notificationOptions}>
      <Root />
    </AlertProvider>,
    document.getElementById("root")
  );
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

startApp();
