import * as React from "react";
import { Mutation } from "react-apollo";
import ReactSVG from "react-svg";

import { Button } from "..";
import Form from "../Form";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import TextField from "../TextField";
import { PASSWORD_RESET_MUTATION } from "./queries";

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
              <p>
                Please provide us your email address so we can share you a link
                to reset your password
              </p>
              <Mutation mutation={PASSWORD_RESET_MUTATION}>
                {(passwordReset, { loading, data }) => {
                  return (
                    <Form
                      errors={
                        data &&
                        data.customerPasswordReset &&
                        data.customerPasswordReset.error
                      }
                      onSubmit={(event, data) => {
                        event.preventDefault();
                        passwordReset({
                          variables: { email: data.email }
                        });
                      }}
                    >
                      <TextField
                        name="email"
                        label="Email Address"
                        type="email"
                        required
                      />
                      <div className="password-reset__content__button">
                        <Button
                          type="submit"
                          {...loading && { disabled: true }}
                        >
                          {loading ? "Loading" : "Reset password"}
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Mutation>
            </div>
          </div>
        </Overlay>
      ) : null
    }
  </OverlayContext.Consumer>
);
