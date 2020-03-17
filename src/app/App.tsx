import "../globalStyles/scss/index.scss";

import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { useCheckout } from "@sdk/react";

import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import { isPath } from "../core/utils";
import { orderConfirmationUrl, Routes } from "./routes";

const App: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname },
  },
}) => {
  const { load } = useCheckout();

  const orderConfirmationPage = isPath(pathname, orderConfirmationUrl);

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <MetaConsumer />
      <header>
        <MainMenu />
      </header>
      <Routes />
      {!orderConfirmationPage && <Footer />}
      <OverlayManager />
    </>
  );
};

export default App;
