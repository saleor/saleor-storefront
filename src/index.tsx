import { Integrations as ApmIntegrations } from "@sentry/apm";
import * as Sentry from "@sentry/browser";
import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import * as React from "react";
import { positions, Provider as AlertProvider, useAlert } from "react-alert";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
import { Route, Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryParamProvider } from "use-query-params";

import { NotificationTemplate } from "@components/atoms";
import {
  ServiceWorkerContext,
  ServiceWorkerProvider,
} from "@components/containers";
import {
  authLink,
  createSaleorClient,
  fireSignOut,
  invalidTokenLinkWithTokenHandler,
  SaleorProvider,
  useAuth,
} from "@saleor/sdk";
import { defaultTheme, GlobalStyle } from "@styles";

import { App } from "./app";
import { OverlayProvider } from "./components";
import ShopProvider from "./components/ShopProvider";
import {
  apiUrl,
  sentryDsn,
  sentrySampleRate,
  serviceWorkerTimeout,
} from "./constants";
import { history } from "./history";

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(obj);
  },
});

const startApp = async () => {
  if (sentryDsn !== undefined) {
    Sentry.init({
      dsn: sentryDsn,
      integrations: [new ApmIntegrations.Tracing()],
      tracesSampleRate: sentrySampleRate,
    });
  }

  await persistCache({
    cache,
    storage: window.localStorage,
  });

  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
  };

  /**
   * This is temporary adapter for queries and mutations not included in SDK to handle invalid token error for them.
   * Note, that after all GraphQL queries and mutations will be replaced by SDK methods, this adapter is going to be removed.
   */
  const ApolloClientInvalidTokenLinkAdapter: React.FC<{
    children: (apolloClient) => React.ReactElement;
  }> = ({ children }) => {
    const tokenExpirationCallback = () => {
      fireSignOut(apolloClient);
    };

    const { link: invalidTokenLink } = invalidTokenLinkWithTokenHandler(
      tokenExpirationCallback
    );

    const apolloClient = React.useMemo(
      () => createSaleorClient(apiUrl, invalidTokenLink, authLink, cache),
      []
    );

    return children(apolloClient);
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
          <ApolloClientInvalidTokenLinkAdapter>
            {apolloClient => (
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
            )}
          </ApolloClientInvalidTokenLinkAdapter>
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
