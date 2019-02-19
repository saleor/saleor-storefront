import "./scss/index.scss";

import * as React from "react";

import { Footer, MainMenu, MetaConsumer, OverlayManager } from "..";
import { Routes } from "./routes";

const App: React.FC = () => (
  <>
    <MetaConsumer />
    <header>
      <MainMenu />
    </header>
    <Routes />
    <Footer />
    <OverlayManager />
  </>
);

export default App;
