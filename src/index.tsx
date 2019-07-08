import { hot } from "react-hot-loader";
import { ThemeProvider } from "styled-components";

import {
  NotificationTemplate,
} from "@components/atoms";
import {
  I18nLoader,
  LanguageProvider,
  ServiceWorkerContext,
  ServiceWorkerProvider
} from "@components/containers";
import { defaultTheme, GlobalStyle } from "@styles";

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

import { App } from "./app";
import CheckoutApp from "./checkout";
import { CheckoutContext } from "./checkout/context";
import CheckoutProvider from "./checkout/provider";
import { baseUrl as checkoutBaseUrl } from "./checkout/routes";
import { apiUrl, serviceWorkerTimeout } from "./constants";
import { history } from "./history";

import { OverlayProvider, UserProvider } from "./components";

import CartProvider from "./components/CartProvider";
import ShopProvider from "./components/ShopProvider";
import { UserContext } from "./components/User/context";

import {
  authLink,
  invalidTokenLinkWithTokenHandlerComponent
} from "./core/auth";

import { languages } from "./languages";

const {
  component: UserProviderWithTokenHandler,
  link: invalidTokenLink,
} = invalidTokenLinkWithTokenHandlerComponent(UserProvider);

const link = ApolloLink.from([
  invalidTokenLink,
  authLink,
  new RetryLink(),
  new BatchHttpLink({ uri: apiUrl }),
]);

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(obj);
  },
});

const startApp = async () => {
  await persistCache({
    cache,
    storage: window.localStorage,
  });

  const apolloClient = new ApolloClient({
    cache,
    link,
  });

  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
  };

  const Root = hot(module)(() => {
    const alert = useAlert();

    const { updateAvailable } = React.useContext(ServiceWorkerContext);

    React.useEffect(() => {
      if (updateAvailable) {
        alert.show(
          {
            actionText: "Refresh",
            content:
              "To update the application to the latest version, please refresh the page!",
            title: "New version is available!",
          },
          {
            onClose: () => {
              location.reload();
            },
            timeout: 0,
            type: "success",
          }
        );
      }
    }, [updateAvailable]);

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
                      title: "You are now logged in",
                    },
                    { type: "success" }
                  )
                }
                onUserLogout={() =>
                  alert.show(
                    {
                      title: "You are now logged out",
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
  });

  render(
    <ThemeProvider theme={defaultTheme}>
      <I18nLoader languages={languages}>
        <LanguageProvider>
          <AlertProvider template={NotificationTemplate} {...notificationOptions}>
            <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
              <GlobalStyle />
              <Root />
            </ServiceWorkerProvider>
          </AlertProvider>
        </LanguageProvider>
      </I18nLoader>
    </ThemeProvider>,
    document.getElementById("root")
  );

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept();
  }
};

startApp();
