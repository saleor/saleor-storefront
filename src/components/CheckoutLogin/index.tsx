import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { RouteComponentProps } from "react-router";

import { LoginForm, PasswordResetForm } from "..";
import { CartContext } from "../CartProvider/context";
import { GoToCheckout } from "../GoToCheckout";
import { UserContext } from "../User/context";

import "./scss/index.scss";

class CheckoutLogin extends React.Component<
  RouteComponentProps<{}>,
  { resetPassword: boolean }
> {
  checkoutButton: any;
  constructor(props) {
    super(props);
    this.state = { resetPassword: false };
  }
  render() {
    return (
      <UserContext.Consumer>
        {({ user }) => {
          if (user) {
            this.checkoutButton.handleCheckoutCreation();
          }
          return (
            <div className="container">
              <div className="checkout-login">
                <div className="checkout-login__guest">
                  <h3 className="checkout__header">Continue as a guest</h3>
                  <p>
                    If you don’t want to register you account at our store don’t
                    worry. You can finish your checkout as a guest. You’ll be
                    treated just as good as a registered user.
                  </p>
                  <CartContext.Consumer>
                    {cart => (
                      <ApolloConsumer>
                        {client => (
                          <GoToCheckout
                            apolloClient={client}
                            cart={cart}
                            ref={node => (this.checkoutButton = node)}
                          >
                            Continue as a guest
                          </GoToCheckout>
                        )}
                      </ApolloConsumer>
                    )}
                  </CartContext.Consumer>
                </div>
                <div className="checkout-login__user">
                  <h3 className="checkout__header">Registered user</h3>

                  {this.state.resetPassword ? (
                    <>
                      <PasswordResetForm />
                      <div className="login__content__password-reminder">
                        <p>
                          <span
                            onClick={() => {
                              this.setState({ resetPassword: false });
                            }}
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
                            onClick={() => {
                              this.setState({ resetPassword: true });
                            }}
                          >
                            Click Here
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default CheckoutLogin;
