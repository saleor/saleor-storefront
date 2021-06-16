import { useAuth } from "@saleor/sdk";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Loader } from "@components/atoms";
import { useDynamicRouteRedirect } from "@hooks";
import { demoMode } from "@temp/constants";
import { getSaleorApi, ShopConfig } from "@utils/ssr";

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

type AppProps = ShopConfig;

declare global {
  interface Window {
    __APOLLO_CLIENT__: any;
  }
}

const App: React.FC<AppProps> = ({
  footer,
  mainMenu,
  shopConfig,
  children,
}) => {
  const { pathname } = useRouter();
  const willRedirect = useDynamicRouteRedirect();
  const { tokenRefreshing, tokenVerifying } = useAuth();
  const loading = tokenRefreshing || tokenVerifying || willRedirect;

  useEffect(() => {
    const attachClient = async () => {
      const { apolloClient } = await getSaleorApi();
      if (window) window.__APOLLO_CLIENT__ = apolloClient;
    };
    if (process.env.NEXT_PUBLIC_ENABLE_APOLLO_DEVTOOLS === "true")
      attachClient();
  }, []);

  return (
    <ShopProvider shopConfig={shopConfig}>
      <OverlayProvider pathname={pathname}>
        <MetaConsumer />
        <MainMenu loading={loading} demoMode={demoMode} menu={mainMenu} />
        {loading ? <Loader fullScreen /> : children}
        <Footer menu={footer} />
        <OverlayManager />
        <Notifications />
      </OverlayProvider>
    </ShopProvider>
  );
};

export default App;
