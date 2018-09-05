import { ApolloClient } from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import { MainMenu, NavigationOverlay, SearchOverlay } from "..";
import { CartOverlay, CartProvider } from "../Cart";
import { OverlayProvider } from "../Overlay";
import { default as Routes } from "./routes";

import "./scss/index.scss";

interface AppProps {
  apolloClient: ApolloClient<any>;
}

const App: React.SFC<AppProps> = ({ apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <CartProvider>
      <OverlayProvider>
        <BrowserRouter>
          <React.Fragment>
            <header>
              <MainMenu />
            </header>
            <section>
              <Routes />
            </section>
            <footer />
            <CartOverlay />
            <NavigationOverlay />
            <SearchOverlay />
          </React.Fragment>
        </BrowserRouter>
      </OverlayProvider>
    </CartProvider>
  </ApolloProvider>
);

export default App;
