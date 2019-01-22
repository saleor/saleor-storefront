import { mediumScreen } from "../components/App/scss/variables.scss";
import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import Media from "react-media";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import {
  CartSummary,
  Offline,
  OfflinePlaceholder,
  Online,
  OverlayManager
} from "../components";
import { BASE_URL } from "../core/config";
import { Routes } from "./routes";

import logoImg from "../images/logo.svg";

const CheckoutApp: React.SFC<RouteComponentProps<{ match; token }>> = ({
  history,
  match: {
    url,
    params: { token = "" }
  }
}) => {
  const reviewPage = history.location.pathname === `${url}/review/`;
  const tokenCreationPage = !token;

  return (
    <div className="checkout">
      <div className="checkout__menu">
        <div className="checkout__menu__bar">
          <ReactSVG path={logoImg} />
        </div>
        <Link to={BASE_URL}>Return to shopping</Link>
      </div>
      <div className="container">
        <Online>
          <div
            className={classNames("checkout__grid", {
              "checkout__grid--review": reviewPage || tokenCreationPage
            })}
          >
            <div
              className={classNames({
                checkout__grid__content: !(reviewPage || tokenCreationPage)
              })}
            >
              <Routes token={token} />
            </div>
            {!reviewPage && (
              <Media
                query={{ minWidth: mediumScreen }}
                render={() => <CartSummary />}
              />
            )}
          </div>
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
      <OverlayManager />
    </div>
  );
};

export default CheckoutApp;
