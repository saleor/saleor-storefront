import * as React from "react";
import { Mutation } from "react-apollo";
import ReactSVG from "react-svg";

import { Button } from "..";
import Form from "../Form";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayTheme, OverlayType } from "../Overlay/context";
import TextField from "../TextField";
import { UserContext } from "../User/context";
import { CUSTOMER_REGISTER_MUTATION } from "./queries";

import "./scss/index.scss";

const RegisterForm: React.SFC = () => (
  <Mutation mutation={CUSTOMER_REGISTER_MUTATION}>
    {(registerCustomer, { loading, data }) => {
      return (
        <Form
          errors={data && data.customerRegister && data.customerRegister.errors}
          onSubmit={(event, data) => {
            registerCustomer({
              variables: { email: data.email, password: data.password }
            });
            event.preventDefault();
          }}
        >
          <TextField name="email" label="Email Address" type="email" required />
          <TextField
            name="password"
            label="Password"
            type="password"
            required
          />
          <div className="login__content__button">
            <Button type="submit">{loading ? "Loading" : "Register"}</Button>
          </div>
        </Form>
      );
    }}
  </Mutation>
);

export class LoginOverlay extends React.Component<
  {},
  { active: "login" | "register" }
> {
  constructor(props) {
    super(props);
    this.state = {
      active: "login"
    };
  }

  changeActiveTab = (active: "login" | "register") => {
    this.setState({ active });
  };

  render() {
    return (
      <OverlayContext.Consumer>
        {overlay =>
          overlay.type === OverlayType.login ? (
            <Overlay context={overlay}>
              <div className="login">
                <div className="overlay__header">
                  <p>Saleor account</p>
                  <ReactSVG
                    path="../../images/x.svg"
                    onClick={() => overlay.hide()}
                    className="overlay__header__close-icon"
                  />
                </div>
                <div className="login__tabs">
                  <span
                    onClick={() => this.changeActiveTab("login")}
                    className={
                      this.state.active === "login" ? "active-tab" : ""
                    }
                  >
                    Sign in to account
                  </span>
                  <span
                    onClick={() => this.changeActiveTab("register")}
                    className={
                      this.state.active === "register" ? "active-tab" : ""
                    }
                  >
                    Register new account
                  </span>
                </div>
                <div className="login__content">
                  <UserContext.Consumer>
                    {({ loading, login, errors }) =>
                      this.state.active === "login" ? (
                        <Form
                          errors={errors}
                          onSubmit={(event, data) => {
                            login(data.email, data.password);
                            event.preventDefault();
                          }}
                        >
                          <TextField
                            name="email"
                            label="Email Address"
                            type="email"
                            required
                          />
                          <TextField
                            name="password"
                            label="Password"
                            type="password"
                            required
                          />
                          <div className="login__content__button">
                            <Button type="submit">
                              {loading ? "Loading" : "Sign in"}
                            </Button>
                          </div>
                          <div className="login__content__password-reminder">
                            <p>
                              Have you forgotten your password?&nbsp;
                              <span
                                onClick={() =>
                                  overlay.show(
                                    OverlayType.password,
                                    OverlayTheme.right
                                  )
                                }
                              >
                                Click Here
                              </span>
                            </p>
                          </div>
                        </Form>
                      ) : (
                        <RegisterForm />
                      )
                    }
                  </UserContext.Consumer>
                </div>
              </div>
            </Overlay>
          ) : null
        }
      </OverlayContext.Consumer>
    );
  }
}
