import "../globalStyles/scss/index.scss";

import React from "react";

import { DemoBanner } from "@components/atoms";
import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import { Routes } from "./routes";

const App: React.FC = () => {
  return (
    <>
      <MetaConsumer />
      <DemoBanner />
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
