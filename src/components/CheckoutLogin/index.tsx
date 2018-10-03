import * as React from "react";

import { Button, LoginForm, PasswordResetForm } from "..";

import "./scss/index.scss";

class CheckoutLogin extends React.Component<{}, { resetPassword: boolean }> {
  constructor(props) {
    super(props);
    this.state = { resetPassword: false };
  }
  render() {
    return (
      <div className="container">
        <div className="checkout-login">
          <div className="checkout-login__guest">
            <h3 className="checkout__header">Continue as a guest</h3>
            <p>
              If you don’t want to register you account at our store don’t
              worry. You can finish your checkout as a guest. You’ll be treated
              just as good as a registered user.
            </p>
            <Button secondary>Continue as a guest</Button>
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
  }
}

export default CheckoutLogin;
