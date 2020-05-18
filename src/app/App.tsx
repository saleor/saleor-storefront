import "../globalStyles/scss/index.scss";
import React from "react";

import { DemoBanner } from "@components/atoms";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import { Routes } from "./routes";
import { demoMode } from "@temp/constants";

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
