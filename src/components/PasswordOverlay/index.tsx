import * as React from "react";
import ReactSVG from "react-svg";

import { Button } from "..";
import Form from "../Form";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import TextField from "../TextField";
import { UserContext } from "../User/context";

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
              <UserContext.Consumer>
                {({ loading, resetPassword, errors }) => (
                  <>
                    <p>
                      Please provide us your email address so we can share you a
                      link to reset your password
                    </p>
                    <Form
                      errors={errors}
                      onSubmit={(event, data) => {
                        resetPassword(data.email, overlay.show);
                        event.preventDefault();
                      }}
                    >
                      <TextField
                        name="email"
                        label="Email Address"
                        type="email"
                        required
                      />
                      <div className="password-reset__content__button">
                        <Button type="submit">
                          {loading ? "Loading" : "Reset password"}
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </UserContext.Consumer>
            </div>
          </div>
        </Overlay>
      ) : null
    }
  </OverlayContext.Consumer>
);
