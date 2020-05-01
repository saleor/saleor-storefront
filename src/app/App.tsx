import "../globalStyles/scss/index.scss";

import React from "react";
import { RouteComponentProps } from "react-router";

import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import { isPath } from "../core/utils";
import { orderConfirmationUrl, Routes } from "./routes";
import './scss/app.scss';

const App: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname },
  },
}) => {
  const orderConfirmationPage = isPath(pathname, orderConfirmationUrl);

  return (
    <>
      <MetaConsumer />
      <div className={pathname === '/' ? "home-page__root" : ''}>
        {pathname === '/' &&
          <header>
            <MainMenu/>
          </header>
        }
        <Routes />
        {(!orderConfirmationPage && pathname === '/')  && <Footer />}
        <OverlayManager />
      </div>
    </>
  );
};

export default App;
