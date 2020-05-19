import "./scss/index.scss";

import * as React from "react";

import { accountConfirmUrl } from "../../../app/routes";

import { Button, Form, TextField } from "../..";
import { maybe } from "../../../core/utils";
import { RegisterAccount } from "./gqlTypes/RegisterAccount";
import { TypedAccountRegisterMutation } from "./queries";

import { AlertManager, useAlert } from "react-alert";

import { commonMessages } from "@saleor/intl";
import { useIntl } from "react-intl";

const showSuccessNotification = (
  data: RegisterAccount,
  hide: () => void,
  alert: AlertManager,
  errorMessage: string,
  successMessage: string
) => {
  const successful = maybe(() => !data.accountRegister.errors.length);

  if (successful) {
    hide();
    alert.show(
      {
        title: data.accountRegister.requiresConfirmation
          ? errorMessage
          : successMessage,
      },
      { type: "success", timeout: 5000 }
    );
  }
};

const RegisterForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const intl = useIntl();

  const alert = useAlert();

  return (
    <TypedAccountRegisterMutation
      onCompleted={data => showSuccessNotification(data, hide, alert,
        intl.formatMessage({defaultMessage: "Please check your e-mail for further instructions"}),
        intl.formatMessage({defaultMessage: "New user has been created"}) )}
    >
      {(registerCustomer, { loading, data }) => {
        return (
          <Form
            errors={maybe(() => data.accountRegister.errors, [])}
            onSubmit={(event, { email, password }) => {
              event.preventDefault();
              const redirectUrl = `${window.location.origin}${accountConfirmUrl}`;
              registerCustomer({ variables: { email, password, redirectUrl } });
            }}
          >
            <TextField
              name="email"
              autoComplete="email"
              label={intl.formatMessage(commonMessages.email)}
              type="email"
              required
            />
            <TextField
              name="password"
              autoComplete="password"
              label={intl.formatMessage(commonMessages.password)}
              type="password"
              required
            />
            <div className="login__content__button">
              <Button type="submit" {...(loading && { disabled: true })}>
                {loading ? intl.formatMessage(commonMessages.loading)
                  : intl.formatMessage({defaultMessage: "Registre"})}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedAccountRegisterMutation>
  );
};

export default RegisterForm;
