import { mediumScreen } from "../components/App/scss/variables.scss";
import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import Media from "react-media";
import { generatePath, Redirect, RouteComponentProps } from "react-router";
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
import { CartSummary } from "./components";
import { CheckoutContext } from "./context";
import { orderConfirmationUrl, reviewUrl, Routes } from "./routes";

import logoImg from "../images/logo.svg";

const isPath = (pathname: string, url: string) =>
  pathname.indexOf(generatePath(url, { token: undefined })) !== -1;

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
