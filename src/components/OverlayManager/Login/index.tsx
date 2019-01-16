import "./scss/index.scss";

import * as React from "react";
import ReactSVG from "react-svg";

import {
  LoginForm,
  Overlay,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType
} from "../..";
import Offline from "../../Offline";
import OfflinePlaceholder from "../../OfflinePlaceholder";
import Online from "../../Online";
import RegisterForm from "./RegisterForm";

import closeImg from "../../../images/x.svg";

class Login extends React.Component<
  { overlay: OverlayContextInterface },
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
    const { overlay } = this.props;
    const { show, hide } = overlay;

    return (
      <Overlay context={overlay}>
        <div className="login">
          <Online>
            <div className="overlay__header">
              <div className="overlay__header-text">Saleor account</div>
              <ReactSVG
                path={closeImg}
                onClick={hide}
                className="overlay__header__close-icon"
              />
            </div>
            <div className="login__tabs">
              <span
                onClick={() => this.changeActiveTab("login")}
                className={this.state.active === "login" ? "active-tab" : ""}
              >
                Sign in to account
              </span>
              <span
                onClick={() => this.changeActiveTab("register")}
                className={this.state.active === "register" ? "active-tab" : ""}
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
                          show(OverlayType.password, OverlayTheme.right)
                        }
                      >
                        Click Here
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <RegisterForm show={show} />
              )}
            </div>
          </Online>
          <Offline>
            <OfflinePlaceholder />
          </Offline>
        </div>
      </Overlay>
    );
  }
}

export default Login;
