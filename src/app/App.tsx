import React from "react";

import { DemoBanner } from "@components/atoms";
import { demoMode } from "@temp/constants";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";

const App: React.FC = () => {
  return (
    <>
      <MetaConsumer />
      {demoMode && <DemoBanner />}
      <header>
        <MainMenu />
      </header>
      <Routes />
      <Footer />
      <OverlayManager />
    </>
  );
};

export default App;
