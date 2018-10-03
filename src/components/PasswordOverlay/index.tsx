import * as React from "react";
import ReactSVG from "react-svg";

import { PasswordResetForm } from "..";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";

import "./scss/index.scss";

export const PasswordOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlay =>
      overlay.type === OverlayType.password ? (
        <Overlay context={overlay}>
          <div className="password-reset">
            <div className="overlay__header">
              <p>Reset your password</p>
              <ReactSVG
                path="../../images/x.svg"
                onClick={() => overlay.hide()}
                className="overlay__header__close-icon"
              />
            </div>
            <div className="password-reset__content">
              <PasswordResetForm />
            </div>
          </div>
        </Overlay>
      ) : null
    }
  </OverlayContext.Consumer>
);
