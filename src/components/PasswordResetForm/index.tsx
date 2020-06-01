import "./scss/index.scss";

import * as React from "react";

import { Button, Form, TextField } from "..";
import { maybe } from "../../core/utils";
import { TypedPasswordResetMutation } from "./queries";

import { passwordResetUrl } from "../../app/routes";

const PasswordResetForm: React.FC = () => (
  <div className="password-reset-form">
    <p>
      Please provide us your email address so we can share you a link to reset
      your password
    </p>
    <TypedPasswordResetMutation>
      {(passwordReset, { loading, data }) => {
        return (
          <Form
            errors={maybe(() => data.requestPasswordReset.errors, [])}
            onSubmit={(event, { email }) => {
              event.preventDefault();
              passwordReset({
                variables: {
                  email,
                  redirectUrl: `${window.location.origin}${passwordResetUrl}`,
                },
              });
            }}
          >
            <TextField
              name="email"
              autoComplete="email"
              label="Email Address"
              type="email"
              required
            />
            <div className="password-reset-form__button">
              <Button dataCy="submitPasswordResetFormButton" type="submit" {...(loading && { disabled: true })}>
                {loading ? "Loading" : "Reset password"}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedPasswordResetMutation>
  </div>
);

export default PasswordResetForm;
