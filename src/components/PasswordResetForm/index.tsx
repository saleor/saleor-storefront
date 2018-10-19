import * as React from "react";
import { Mutation } from "react-apollo";

import { Button, Form, TextField } from "..";
import { PASSWORD_RESET_MUTATION } from "./queries";

import "./scss/index.scss";

const PasswordResetForm: React.SFC = () => (
  <div className="password-reset-form">
    <p>
      Please provide us your email address so we can share you a link to reset
      your password
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
              autoComplete="email"
              label="Email Address"
              type="email"
              required
            />
            <div className="password-reset-form__button">
              <Button type="submit" {...loading && { disabled: true }}>
                {loading ? "Loading" : "Reset password"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Mutation>
  </div>
);

export default PasswordResetForm;
