import { useAuth } from "@saleor/sdk";
import { NextPage } from "next";
import React, { useContext } from "react";

import { OfflinePlaceholder, Redirect } from "@components/atoms";
import { paths } from "@paths";

import { Offline, Online, OverlayContext } from "..";
import { OverlayTheme, OverlayType } from "../Overlay";
import CheckoutAsGuest from "./CheckoutAsGuest";
import SignInForm from "./SignInForm";

import "./scss/index.scss";

const CheckoutLogin: NextPage = () => {
  const overlay = useContext(OverlayContext);
  const { user } = useAuth();
  const { show } = overlay;

  const showPasswordResetOverlay = () => {
    show(OverlayType.password, OverlayTheme.right);
  };

  return user ? (
    <Redirect url={paths.checkout} />
  ) : (
    <div className="container">
      <Online>
        <div className="checkout-login">
          <CheckoutAsGuest overlay={overlay} checkoutUrl="/checkout/" />
          <div className="checkout-login__user">
            <SignInForm onForgottenPasswordClick={showPasswordResetOverlay} />
          </div>
        </div>
      </Online>
      <Offline>
        <OfflinePlaceholder />
      </Offline>
    </div>
  );
};

export default CheckoutLogin;
