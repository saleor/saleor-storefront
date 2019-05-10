import "./scss/index.scss";

import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";

import { baseUrl as checkoutUrl } from "../../checkout/routes";
import { UserContext } from "../User/context";

import CheckoutAsGuest from "./CheckoutAsGuest";
import ResetPasswordForm from "./ResetPasswordForm";
import SignInForm from "./SignInForm";

const CheckoutLogin: React.FC<{}> = () => {
  const [resetPassword, setResetPassword] = useState(false);
  return (
    <OverlayContext.Consumer>
      {overlayContext => {
        return (
          <UserContext.Consumer>
            {({ user }) => {
              if (user) {
                return <Redirect to={checkoutUrl} />;
              }
              return (
                <div className="container">
                  <Online>
                    <div className="checkout-login">
                      <CheckoutAsGuest
                        overlayContext={overlayContext}
                        checkoutUrl={checkoutUrl}
                      />
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
            }}
          </UserContext.Consumer>
        );
      }}
    </OverlayContext.Consumer>
  );
};

export default CheckoutLogin;
