import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { Footer, MainMenu, NavigationOverlay, SearchOverlay } from "..";
import { CartOverlay } from "../CartOverlay";
import CartProvider from "../CartProvider";
import { LoginOverlay } from "../LoginOverlay";
import { NotificationOverlay } from "../NotificationOverlay";
import { PasswordOverlay } from "../PasswordOverlay";
import { default as Routes } from "./routes";

import "./scss/index.scss";

const App: React.SFC<{}> = () => (
  <CartProvider>
    <BrowserRouter>
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
    </BrowserRouter>
  </CartProvider>
);

export default App;
