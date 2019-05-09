import "./scss/index.scss";

import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";

import { baseUrl as checkoutUrl } from "../../checkout/routes";
import { UserContext } from "../User/context";

import CheckoutAsGuest from "./CheckoutAsGuest";
import ResetPasswordForm from "./ResetPasswordForm";
import SignInForm from "./SignInForm";

class CheckoutLogin extends React.PureComponent<
  RouteComponentProps<{}>,
  { resetPassword: boolean }
> {
  state = { resetPassword: false };

  render() {
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
                          {this.state.resetPassword ? (
                            <ResetPasswordForm
                              onClick={() => {
                                this.setState({ resetPassword: false });
                              }}
                            />
                          ) : (
                            <SignInForm
                              onClick={() => {
                                this.setState({ resetPassword: true });
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
  }
}

export default CheckoutLogin;
