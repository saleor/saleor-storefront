import "./scss/index.scss";

import * as React from "react";

import { ApolloConsumer } from "react-apollo";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "..";
import CartProvider from "../CartProvider";
import { Routes } from "./routes";

const App: React.SFC<{}> = () => (
  <>
    <MetaConsumer />
    <header>
      <MainMenu />
    </header>
    <Routes />
    <Footer />
    <OverlayManager />
  </>
);

export default App;
