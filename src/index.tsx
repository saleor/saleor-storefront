import { Integrations as ApmIntegrations } from "@sentry/apm";
import * as Sentry from "@sentry/browser";
import * as React from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import { render } from "react-dom";
import TagManager from "react-gtm-module";
import { hot } from "react-hot-loader";
import { Route, Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryParamProvider } from "use-query-params";

import { NotificationTemplate } from "@components/atoms";
import { ServiceWorkerProvider } from "@components/containers";
import { SaleorProvider } from "@saleor/sdk";
import { ConfigInput } from "@saleor/sdk/lib/types";
import { defaultTheme, GlobalStyle } from "@styles";

import { App } from "./app";
import { LocaleProvider } from "./components/Locale";
import {
  apiUrl,
  sentryDsn,
  sentrySampleRate,
  serviceWorkerTimeout,
} from "./constants";
import { history } from "./history";

const SALEOR_CONFIG: ConfigInput = {
  apiUrl,
};

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

  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
  };

  const Root = hot(module)(() => {
    return (
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <SaleorProvider config={SALEOR_CONFIG}>
            <App />
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
