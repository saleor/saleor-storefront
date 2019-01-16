import "./scss/index.scss";

import * as React from "react";

import { ApolloConsumer } from "react-apollo";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "..";
import CartProvider from "../CartProvider";
import { Routes } from "./routes";

const App: React.SFC<{}> = () => (
  <ApolloConsumer>
    {client => (
      <>
        <MetaConsumer />
        <CartProvider apolloClient={client}>
          <header>
            <MainMenu />
          </header>
          <Routes />
          <Footer />
          <OverlayManager />
        </CartProvider>
      </>
    )}
  </ApolloConsumer>
);

export default App;
