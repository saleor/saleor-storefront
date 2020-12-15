import { ConfigInput } from "@saleor/sdk/lib/types";
import { positions, Provider as AlertProvider } from "react-alert";
import { SaleorProvider } from "@saleor/sdk";
import * as React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { Integrations as ApmIntegrations } from "@sentry/apm";
import TagManager from "react-gtm-module";
import * as Sentry from "@sentry/browser";
import { defaultTheme, GlobalStyle } from "@styles";
import { NotificationTemplate } from "@components/atoms";
import { NextQueryParamProvider } from "@temp/components";
import Head from "next/head";
import { ServiceWorkerProvider } from "@components/containers";
import {
  apiUrl,
  channelSlug,
  sentryDsn,
  sentrySampleRate,
  serviceWorkerTimeout,
  ssrMode,
} from "../constants";
import { LocaleProvider } from "../components/Locale";
import { App as StorefrontApp } from "../app";
import { version } from "../../package.json";

if (!ssrMode) {
  window.version = version;
}

if (process.env.GTM_ID) {
  TagManager.initialize({ gtmId: process.env.GTM_ID });
}

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new ApmIntegrations.Tracing()],
    tracesSampleRate: sentrySampleRate,
  });
}

const saleorConfig: ConfigInput = { apiUrl, channel: channelSlug };

const notificationConfig = { position: positions.BOTTOM_RIGHT, timeout: 2500 };

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Demo PWA Storefront – Saleor Commerce</title>
      <link rel="preconnect" href={apiUrl} />
      <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
      <link rel="icon" type="image/png" href="/favicon-36.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <ThemeProvider theme={defaultTheme}>
      <AlertProvider
        template={NotificationTemplate as any}
        {...notificationConfig}
      >
        <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
          <LocaleProvider>
            <GlobalStyle />
            <NextQueryParamProvider>
              <SaleorProvider config={saleorConfig}>
                <StorefrontApp>
                  <Component {...pageProps} />
                </StorefrontApp>
              </SaleorProvider>
            </NextQueryParamProvider>
          </LocaleProvider>
        </ServiceWorkerProvider>
      </AlertProvider>
    </ThemeProvider>
  </>
);

export default App;
