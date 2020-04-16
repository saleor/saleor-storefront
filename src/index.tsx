import { hot } from "react-hot-loader";
import { ThemeProvider } from "styled-components";

import { NotificationTemplate } from "@components/atoms";
import {
  ServiceWorkerContext,
  ServiceWorkerProvider,
} from "@components/containers";
import { SaleorProvider, useAuth } from "@sdk/react";
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
import { Route, Router } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import { App } from "./app";
import { apiUrl, serviceWorkerTimeout } from "./constants";
import { history } from "./history";

import { OverlayProvider, UserProvider } from "./components";

import ShopProvider from "./components/ShopProvider";

import {
  authLink,
  invalidTokenLinkWithTokenHandlerComponent,
} from "./core/auth";

const { link: invalidTokenLink } = invalidTokenLinkWithTokenHandlerComponent(
  UserProvider
);

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
    const Notifications = () => {
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

      useAuth((authenticated: boolean) => {
        if (authenticated) {
          alert.show(
            {
              title: "You are now logged in",
            },
            { type: "success" }
          );
        } else {
          alert.show(
            {
              title: "You are now logged out",
            },
            { type: "success" }
          );
        }
      });
      return null;
    };

    return (
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ApolloProvider client={apolloClient}>
            <SaleorProvider client={apolloClient}>
              <ShopProvider>
                <OverlayProvider>
                  <App />
                  <Notifications />
                </OverlayProvider>
              </ShopProvider>
            </SaleorProvider>
          </ApolloProvider>
        </QueryParamProvider>
      </Router>
    );
  });

  render(
    <ThemeProvider theme={defaultTheme}>
      <AlertProvider
        template={NotificationTemplate as any}
        {...notificationOptions}
      >
        <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
          <GlobalStyle />
          <Root />
        </ServiceWorkerProvider>
      </AlertProvider>
    </ThemeProvider>,
    document.getElementById("root")
  );

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept();
  }
};

startApp();
