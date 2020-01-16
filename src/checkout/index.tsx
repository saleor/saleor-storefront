import "./scss/index.scss";

import * as React from "react";
import { generatePath, Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { useVariantsProducts } from "@sdk/react";

import {
  Loader,
  Offline,
  OfflinePlaceholder,
  Online,
  OverlayManager,
} from "../components";
import { CartContext } from "../components/CartProvider/context";
import { BASE_URL } from "../core/config";
import { CheckoutContext, CheckoutStep } from "./context";
import { billingUrl, Routes } from "./routes";

import logoImg from "../images/logo.svg";

const CheckoutApp: React.FC<{ location: any }> = ({ location }) => {
  const { loading, checkout, cardData, dummyStatus } = React.useContext(
    CheckoutContext
  );
  const { lines: cartLines } = React.useContext(CartContext);

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
          {(() => {
            if (!cartLines.length) {
              return <Redirect to={BASE_URL} />;
            }

            if (loading) {
              return <Loader />;
            }

            return <Routes />;
          })()}
        </Online>
        <Offline>
          <OfflinePlaceholder />
        </Offline>
      </div>
      <OverlayManager />
    </div>
  );
};

export default withRouter(CheckoutApp);
