import { SaleorProvider } from "@saleor/sdk";
import { ConfigInput } from "@saleor/sdk/lib/types";
import { Integrations as ApmIntegrations } from "@sentry/apm";
import * as Sentry from "@sentry/browser";
import type {
  AppContext as NextAppContext,
  AppProps as NextAppProps,
} from "next/app";
import NextApp from "next/app";
import Head from "next/head";
import * as React from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import TagManager from "react-gtm-module";
import { ThemeProvider } from "styled-components";

import { NotificationTemplate } from "@components/atoms";
import { ServiceWorkerProvider } from "@components/containers";
import { defaultTheme, GlobalStyle } from "@styles";
import { NextQueryParamProvider } from "@temp/components";
import { getSaleorApi, getShopConfig, ShopConfig } from "@utils/ssr";

import { version } from "../../package.json";
import { App as StorefrontApp } from "../app";
import {
  loadMessagesJson,
  Locale,
  LocaleMessages,
  LocaleProvider,
} from "../components/Locale";
import {
  apiUrl,
  channelSlug,
  sentryDsn,
  sentrySampleRate,
  serviceWorkerTimeout,
  ssrMode,
} from "../constants";

declare global {
  interface Window {
    __APOLLO_CLIENT__: any;
  }
}
const attachClient = async () => {
  const { apolloClient } = await getSaleorApi();
  window.__APOLLO_CLIENT__ = apolloClient;
};

if (!ssrMode) {
  window.version = version;
  if (process.env.NEXT_PUBLIC_ENABLE_APOLLO_DEVTOOLS === "true") attachClient();
}

if (process.env.GTM_ID) {
  TagManager.initialize({ gtmId: process.env.GTM_ID });
}

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    // @ts-ignore
    integrations: [new ApmIntegrations.Tracing()],
    tracesSampleRate: sentrySampleRate,
  });
}

const saleorConfig: ConfigInput = { apiUrl, channel: channelSlug };

const notificationConfig = { position: positions.BOTTOM_RIGHT, timeout: 2500 };

type AppProps = NextAppProps & ShopConfig & { messages: LocaleMessages };

const App = ({
  Component,
  pageProps,
  footer,
  mainMenu,
  messages,
  shopConfig,
}: AppProps) => (
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
          <LocaleProvider messages={messages}>
            <GlobalStyle />
            <NextQueryParamProvider>
              <SaleorProvider config={saleorConfig}>
                <StorefrontApp
                  footer={footer}
                  mainMenu={mainMenu}
                  shopConfig={shopConfig}
                >
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

// Fetch shop config only once and cache it.
let shopConfig: ShopConfig | null = null;

App.getInitialProps = async (appContext: NextAppContext) => {
  const {
    router: { locale },
  } = appContext;
  const appProps = await NextApp.getInitialProps(appContext);
  let messages: LocaleMessages;

  if (ssrMode) {
    if (!shopConfig) {
      shopConfig = await getShopConfig();
    }

    messages = await loadMessagesJson(locale as Locale);
  }

  return { ...appProps, ...shopConfig, messages };
};

export default App;
