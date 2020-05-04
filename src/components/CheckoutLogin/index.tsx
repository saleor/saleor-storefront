import "./scss/index.scss";

import React, { useContext, useState } from "react";
import { Redirect } from "react-router";

import { useUserDetails } from "@sdk/react";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";

import CheckoutAsGuest from "./CheckoutAsGuest";
import ResetPasswordForm from "./ResetPasswordForm";
import SignInForm from "./SignInForm";

const CheckoutLogin: React.FC<{}> = () => {
  const [resetPassword, setResetPassword] = useState(false);
  const overlay = useContext(OverlayContext);
  const { data: user } = useUserDetails();
  if (user) {
    return <Redirect to="/checkout/" />;
  }
  return (
    <div className="container">
      <Online>
        <div className="checkout-login">
          <CheckoutAsGuest overlay={overlay} checkoutUrl="/checkout/" />
          <div className="checkout-login__user">
            {resetPassword ? (
              <ResetPasswordForm
                onClick={() => {
                  setResetPassword(false);
                }}
              />
            ) : (
              <SignInForm
                onClick={() => {
                  setResetPassword(true);
                }}
              />
            )}
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
