import "./scss/index.scss";

import * as React from "react";
import { Redirect, withRouter } from "react-router";
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
import logoImg from "../images/logo.svg";
import { CheckoutContext } from "./context";
import { useCheckoutStepFromPath, useCheckoutStepState } from "./hooks";
import { baseUrl, Routes } from "./routes";

const CheckoutApp: React.FC<{ location }> = ({ location }) => {
  const {
    loading: checkoutLoading,
    checkout,
    cardData,
    dummyStatus,
  } = React.useContext(CheckoutContext);
  const { lines: cartLines } = React.useContext(CartContext);

  const {
    data: variantsProducts,
    loading: variantsProductsLoading,
  } = useVariantsProducts({
    ids: cartLines ? cartLines.map(line => line.variantId) : [],
  });

  const { pathname } = location;

  const step = useCheckoutStepState(
    checkout,
    variantsProducts,
    cardData,
    dummyStatus
  );
  const stepFromPath = useCheckoutStepFromPath(pathname);

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

            if (
              checkoutLoading ||
              variantsProductsLoading ||
              !step ||
              (!stepFromPath && baseUrl !== pathname)
            ) {
              return <Loader />;
            }

            if ((!checkout && !variantsProducts) || step < stepFromPath) {
              return <Redirect to={baseUrl} />;
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
