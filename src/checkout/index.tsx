import "./scss/index.scss";

import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";
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
import { BASE_URL as appBaseUrl } from "../core/config";
import logoImg from "../images/logo.svg";
import { CheckoutContext } from "./context";
import { useCheckoutStepFromPath, useCheckoutStepState } from "./hooks";
import { baseUrl as checkoutBaseUrl, CheckoutRoutes } from "./routes";

const CheckoutApp: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname },
  },
}) => {
  const {
    loading: checkoutLoading,
    checkout,
    cardData,
    dummyStatus,
  } = React.useContext(CheckoutContext);
  const { lines: cartLines, loading: cartLoading } = React.useContext(
    CartContext
  );

  const {
    data: variantsProducts,
    loading: variantsProductsLoading,
  } = useVariantsProducts({
    ids: cartLines ? cartLines.map(line => line.variantId) : [],
  });

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
        <Link to={appBaseUrl}>Return to shopping</Link>
      </div>
      <div className="container">
        <Online>
          {(() => {
            if (
              cartLoading ||
              checkoutLoading ||
              variantsProductsLoading ||
              !step ||
              (!stepFromPath && checkoutBaseUrl !== pathname)
            ) {
              return <Loader />;
            }

            if (!cartLines.length) {
              return <Redirect to={appBaseUrl} />;
            }

            if (
              ((!checkout && !variantsProducts) || step < stepFromPath) &&
              checkoutBaseUrl !== pathname
            ) {
              return <Redirect to={checkoutBaseUrl} />;
            }

            return <CheckoutRoutes />;
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

export default CheckoutApp;
