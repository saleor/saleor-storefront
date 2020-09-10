import React from "react";

import { useAuth } from "@saleor/sdk";
import { DemoBanner, Loader } from "@components/atoms";
import { demoMode } from "@temp/constants";
import {
  Footer,
  MainMenu,
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";
import Notifications from "./Notifications";

const App: React.FC = () => {
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  return (
    <ShopProvider>
      <OverlayProvider>
        <MetaConsumer />
        {demoMode && <DemoBanner />}
        <header>
          <MainMenu />
        </header>
        <Routes />
        <Footer />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
