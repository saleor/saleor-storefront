import "../globalStyles/scss/index.scss";

import React from "react";
import { RouteComponentProps } from "react-router";
import { ThemeProvider } from "styled-components";

import { defaultTheme, GlobalStyle } from "@styles";

import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import { isPath } from "../core/utils";
import { orderConfirmationUrl, Routes } from "../routes";

const App: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname },
  },
}) => {
  const orderConfirmationPage = isPath(pathname, orderConfirmationUrl);

  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <MetaConsumer />
        <header>
          <MainMenu />
        </header>
        <Routes />
        {!orderConfirmationPage && <Footer />}
        <OverlayManager />
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
};

export default App;
