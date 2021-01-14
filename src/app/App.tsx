import { useAuth } from "@saleor/sdk";
import { useRouter } from "next/router";
import React from "react";

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
import Notifications from "./Notifications";

import "../globalStyles/scss/index.scss";

const App: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  return (
    <ShopProvider>
      <OverlayProvider pathname={pathname}>
        <MetaConsumer />
        <MainMenu demoMode={demoMode} />
        {children}
        <Footer />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
