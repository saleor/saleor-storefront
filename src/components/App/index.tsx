import * as React from "react";

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
    <header>
      <MainMenu />
    </header>
    <Routes />
    <Footer />
    <CartOverlay />
    <LoginOverlay />
    <PasswordOverlay />
    <NavigationOverlay />
    <NotificationOverlay />
    <SearchOverlay />
  </CartProvider>
);

export default App;
