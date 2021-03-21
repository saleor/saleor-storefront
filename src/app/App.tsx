import React from "react";

import { useAuth } from "@saleor/sdk";
import { Loader } from "@components/atoms";
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
import { Routes, RoutesPartner } from "./routes";
import Notifications from "./Notifications";

const App: React.FC = () => {
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  const collectionId =
    process.env.COLLECTION_ID !== "false" ? process.env.COLLECTION_ID : null;

  return (
    <ShopProvider>
      <OverlayProvider>
        <MetaConsumer />
        <MainMenu demoMode={demoMode} />
        {collectionId ? <RoutesPartner /> : <Routes />}
        <Footer />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
