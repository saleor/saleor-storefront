import { Integrations as ApmIntegrations } from "@sentry/apm";
import * as Sentry from "@sentry/browser";
import {
  defaultDataIdFromObject,
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import * as React from "react";
import { useIntl } from "react-intl";
import { positions, Provider as AlertProvider, useAlert } from "react-alert";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import TagManager from "react-gtm-module";
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
  SaleorProvider,
  useAuth,
} from "@saleor/sdk";
import { defaultTheme, GlobalStyle } from "@styles";

import { App } from "./app";
import { OverlayProvider } from "./components";
import { LocaleProvider } from "./components/Locale";
import ShopProvider from "./components/ShopProvider";
import {
  apiUrl,
  sentryDsn,
  sentrySampleRate,
  serviceWorkerTimeout,
} from "./constants";
import { history } from "./history";

const Notifications: React.FC = () => {
  const alert = useAlert();
  const intl = useIntl();

  const { updateAvailable } = React.useContext(ServiceWorkerContext);

  React.useEffect(() => {
    if (updateAvailable) {
      alert.show(
        {
          actionText: intl.formatMessage({ defaultMessage: "Refresh" }),
          content: intl.formatMessage({
            defaultMessage:
              "To update the application to the latest version, please refresh the page!",
          }),
          title: intl.formatMessage({
            defaultMessage: "New version is available!",
          }),
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

  const { authenticated } = useAuth();
  const [prevAuthenticated, setPrevAuthenticated] = React.useState<
    boolean | undefined
  >();

  React.useEffect(() => {
    if (prevAuthenticated !== undefined && authenticated !== undefined) {
      if (!prevAuthenticated && authenticated) {
        alert.show(
          {
            title: intl.formatMessage({
              defaultMessage: "You are now logged in",
            }),
          },
          { type: "success" }
        );
      } else if (prevAuthenticated && !authenticated) {
        alert.show(
          {
            title: intl.formatMessage({
              defaultMessage: "You are now logged out",
            }),
          },
          { type: "success" }
        );
      }
      setPrevAuthenticated(authenticated);
    } else if (authenticated !== undefined) {
      setPrevAuthenticated(authenticated);
    }
  }, [authenticated]);

  return null;
};

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(obj);
  },
});

if (process.env.GTM_ID !== undefined) {
  TagManager.initialize({ gtmId: process.env.GTM_ID });
}

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

  const Root = hot(module)(() => {
    const [apolloClient, setApolloClient] = React.useState<
      ApolloClient<NormalizedCacheObject>
    >();

    const attachApolloClientToSaleor = (invalidTokenLink: ApolloLink) => {
      const client = createSaleorClient(
        apiUrl,
        invalidTokenLink,
        authLink,
        cache
      );
      setApolloClient(client);

      return client;
    };

    return (
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <SaleorProvider attachApolloClient={attachApolloClientToSaleor}>
            {apolloClient && (
              <ApolloProvider client={apolloClient}>
                <ShopProvider>
                  <OverlayProvider>
                    <App />
                    <Notifications />
                  </OverlayProvider>
                </ShopProvider>
              </ApolloProvider>
            )}
          </SaleorProvider>
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
          <LocaleProvider>
            <GlobalStyle />
            <Root />
          </LocaleProvider>
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
