import "./scss/index.scss";

import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import {
  Button,
  LoginForm,
  Offline,
  OfflinePlaceholder,
  Online,
  PasswordResetForm
} from "..";
import { baseUrl as checkoutUrl } from "../../checkout/routes";
import { UserContext } from "../User/context";

class CheckoutLogin extends React.PureComponent<
  RouteComponentProps<{}>,
  { resetPassword: boolean }
> {
  state = { resetPassword: false };

  render() {
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
                  <div className="checkout-login__guest">
                    <h3 className="checkout__header">Continue as a guest</h3>
                    <p>
                      If you don’t want to register you account at our store
                      don’t worry. You can finish your checkout as a guest.
                      You’ll be treated just as good as a registered user.
                    </p>
                    <Link to={checkoutUrl}>
                      <Button>Continue as a guest</Button>
                    </Link>
                  </div>
                  <div className="checkout-login__user">
                    <h3 className="checkout__header">Registered user</h3>

                    {this.state.resetPassword ? (
                      <>
                        <PasswordResetForm />
                        <div className="login__content__password-reminder">
                          <p>
                            <span
                              onClick={() =>
                                this.setState({ resetPassword: false })
                              }
                            >
                              Back to login
                            </span>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <LoginForm />
                        <div className="login__content__password-reminder">
                          <p>
                            Have you forgotten your password?&nbsp;
                            <span
                              onClick={() =>
                                this.setState({ resetPassword: true })
                              }
                            >
                              Click Here
                            </span>
                          </p>
                        </div>
                      </>
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
  }
}

export default CheckoutLogin;
