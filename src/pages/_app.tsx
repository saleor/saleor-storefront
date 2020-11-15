import { ConfigInput } from "@saleor/sdk/lib/types";
import { positions, Provider as AlertProvider } from "react-alert";
import { SaleorProvider } from "@saleor/sdk";
import * as React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "@styles";
import { NotificationTemplate } from "@components/atoms";
import { apiUrl } from "../constants";
import { LocaleProvider } from "../components/Locale";
import { App as StorefrontApp } from "../app";

const saleorConfig: ConfigInput = { apiUrl };

const notificationOptions = {
  position: positions.BOTTOM_RIGHT,
  timeout: 2500,
};

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={defaultTheme}>
    <AlertProvider
      template={NotificationTemplate as any}
      {...notificationOptions}
    >
      <GlobalStyle />
      <LocaleProvider>
        <SaleorProvider config={saleorConfig}>
          <StorefrontApp>
            <Component {...pageProps} />
          </StorefrontApp>
        </SaleorProvider>
      </LocaleProvider>
    </AlertProvider>
  </ThemeProvider>
);

export default App;
