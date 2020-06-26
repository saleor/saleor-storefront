import "./scss/index.scss";

import * as React from "react";

import { AlertManager, useAlert } from "react-alert";
import { useIntl, IntlShape } from "react-intl";
import { commonMessages } from "@temp/intl";
import { accountConfirmUrl } from "../../../app/routes";

import { Button, Form, TextField } from "../..";
import { maybe } from "../../../core/utils";
import { RegisterAccount } from "./gqlTypes/RegisterAccount";
import { TypedAccountRegisterMutation } from "./queries";

const showSuccessNotification = (
  data: RegisterAccount,
  hide: () => void,
  alert: AlertManager,
  intl: IntlShape
) => {
  const successful = maybe(() => !data.accountRegister.errors.length);

  if (successful) {
    hide();
    alert.show(
      {
        title: data.accountRegister.requiresConfirmation
          ? intl.formatMessage({
              defaultMessage:
                "Please check your e-mail for further instructions",
            })
          : intl.formatMessage({ defaultMessage: "New user has been created" }),
      },
      { type: "success", timeout: 5000 }
    );
  }
};

const RegisterForm: React.FC<{ hide: () => void }> = ({ hide }) => {
  const alert = useAlert();
  const intl = useIntl();

  return (
    <TypedAccountRegisterMutation
      onCompleted={data => showSuccessNotification(data, hide, alert, intl)}
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
              label={intl.formatMessage(commonMessages.eMail)}
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
              <Button
                testingContext="submitRegisterFormButton"
                type="submit"
                {...(loading && { disabled: true })}
              >
                {loading
                  ? intl.formatMessage(commonMessages.loading)
                  : intl.formatMessage({ defaultMessage: "Register" })}
              </Button>
            </div>
          </Form>
        );
      }}
    </TypedAccountRegisterMutation>
  );
};

export default RegisterForm;
