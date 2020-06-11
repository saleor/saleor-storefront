import "./scss/index.scss";

import * as React from "react";

import { Button, Form, TextField } from "..";
import { maybe } from "../../core/utils";
import { TypedPasswordResetMutation } from "./queries";

import { passwordResetUrl } from "../../app/routes";

const PasswordResetForm: React.FC = () => (
  <div className="password-reset-form">
    <p>
      Podaj adres email na który prześlemy Ci link do zresetowania Twojego hasła
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
              label="Adres Email"
              type="email"
              required
            />
            <div className="password-reset-form__button">
              <Button dataCy="submitPasswordResetFormButton" type="submit" {...(loading && { disabled: true })}>
                {loading ? "Ładowanie" : "Resetuj Hasło"}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedPasswordResetMutation>
  </div>
);

export default PasswordResetForm;
