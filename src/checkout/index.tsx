import "./scss/index.scss";

import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import {
  Loader,
  Offline,
  OfflinePlaceholder,
  Online,
  OverlayManager
} from "../components";
import { CartContext } from "../components/CartProvider/context";
import { BASE_URL } from "../core/config";
import { isPath } from "../core/utils";
import { CheckoutContext } from "./context";
import { orderConfirmationUrl, Routes } from "./routes";

import logoImg from "../images/logo.svg";

const CheckoutApp: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname }
  }
}) => {
  const orderConfirmationPage = isPath(pathname, orderConfirmationUrl);

  return (
    <div className="checkout">
      <div className="checkout__menu">
        <div className="checkout__menu__bar">
          <ReactSVG path={logoImg} />
        </div>
        {!orderConfirmationPage && (
          <Link to={BASE_URL}>Return to shopping</Link>
        )}
      </div>
      <div className="container">
        <Online>
          <CartContext.Consumer>
            {cart => (
              <CheckoutContext.Consumer>
                {({ loading }) => {
                  if (!cart.lines.length && !orderConfirmationPage) {
                    return <Redirect to={BASE_URL} />;
                  }

                  if (loading) {
                    return <Loader />;
                  }

                  return <Routes />;
                }}
              </CheckoutContext.Consumer>
            )}
          </CartContext.Consumer>
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
