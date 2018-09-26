import { ApolloClient } from "apollo-client";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import { Footer, MainMenu, NavigationOverlay, SearchOverlay } from "..";
import { CartOverlay } from "../CartOverlay";
import CartProvider from "../CartProvider";
import { LoginOverlay } from "../LoginOverlay";
import { NotificationOverlay } from "../NotificationOverlay";
import { OverlayProvider } from "../Overlay";
import { PasswordOverlay } from "../PasswordOverlay";
import { default as Routes } from "./routes";

import "./scss/index.scss";

interface AppProps {
  apolloClient: ApolloClient<any>;
}

const App: React.SFC<AppProps> = ({ apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <CartProvider>
      <BrowserRouter>
        <OverlayProvider>
          <React.Fragment>
            <header>
              <MainMenu />
            </header>
            <section>
              <Routes />
            </section>
            <Footer />
            <CartOverlay />
            <LoginOverlay />
            <PasswordOverlay />
            <NavigationOverlay />
            <NotificationOverlay />
            <SearchOverlay />
          </React.Fragment>
        </OverlayProvider>
      </BrowserRouter>
    </CartProvider>
  </ApolloProvider>
);

export default App;
