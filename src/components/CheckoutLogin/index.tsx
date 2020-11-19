import "./scss/index.scss";

import React, { useContext, useEffect } from "react";

import { useAuth } from "@saleor/sdk";

import { NextPage } from "next";
import { useRouter } from "next/router";
import { checkoutUrl } from "@temp/app/routes";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";

import CheckoutAsGuest from "./CheckoutAsGuest";
import SignInForm from "./SignInForm";
import { OverlayType, OverlayTheme } from "../Overlay";

const CheckoutLogin: NextPage = () => {
  const overlay = useContext(OverlayContext);
  const { user } = useAuth();
  const { show } = overlay;
  const { push } = useRouter();

  const showPasswordResetOverlay = () => {
    show(OverlayType.password, OverlayTheme.right);
  };

  useEffect(() => {
    if (user) {
      push(checkoutUrl);
    }
  }, [user]);

  return (
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
