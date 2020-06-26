import "./scss/index.scss";

import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { commonMessages } from "@temp/intl";

import { Button, Form, TextField } from "..";
import { maybe } from "../../core/utils";
import { TypedPasswordResetMutation } from "./queries";

import { passwordResetUrl } from "../../app/routes";

const PasswordResetForm: React.FC = () => {
  const intl = useIntl();
  return (
    <div className="password-reset-form">
      <p>
        <FormattedMessage defaultMessage="Please provide us your email address so we can share you a link to reset your password" />
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
                label={intl.formatMessage(commonMessages.eMail)}
                type="email"
                required
              />
              <div className="password-reset-form__button">
                <Button
                  testingContext="submit"
                  type="submit"
                  {...(loading && { disabled: true })}
                >
                  {loading
                    ? intl.formatMessage(commonMessages.loading)
                    : intl.formatMessage({ defaultMessage: "Reset password" })}
                </Button>
              </div>
            </Form>
          );
        }}
      </TypedPasswordResetMutation>
    </div>
  );
};

export default PasswordResetForm;
