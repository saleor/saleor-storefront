import "./scss/index.scss";

import * as React from "react";
import ReactSVG from "react-svg";

import { LoginForm } from "..";
import Offline from "../Offline";
import OfflinePlaceholder from "../OfflinePlaceholder";
import Online from "../Online";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayTheme, OverlayType } from "../Overlay/context";
import RegisterForm from "./RegisterForm";

import closeImg from "../../images/x.svg";

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
                <Online>
                  <div className="overlay__header">
                    <div className="overlay__header-text">Saleor account</div>
                    <ReactSVG
                      path={closeImg}
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
                    {this.state.active === "login" ? (
                      <>
                        <LoginForm />
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
                      </>
                    ) : (
                      <RegisterForm />
                    )}
                  </div>
                </Online>
                <Offline>
                  <OfflinePlaceholder />
                </Offline>
              </div>
            </Overlay>
          ) : null
        }
      </OverlayContext.Consumer>
    );
  }
}
