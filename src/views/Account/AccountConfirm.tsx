import * as React from "react";
import { useAlert } from "react-alert";

import { StringParam, useQueryParams } from "use-query-params";

import { BASE_URL } from "../../core/config";

import { RouteComponentProps } from "react-router";
import { TypedAccountConfirmMutation } from "./queries";

import "./scss/index.scss";

import { useIntl } from "react-intl";

const AccountConfirm: React.FC<RouteComponentProps> = ({ history }) => {
  const intl = useIntl();

  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });

  const alert = useAlert();

  const displayConfirmationAlert = anyErrors => {
    alert.show(
      {
        content: anyErrors.length > 0 ? anyErrors.map(
          error => error.message
        ).join(" "): intl.formatMessage({
          defaultMessage: "You can now log in",
          description: "no error AccountConfirm message",
       }),
        title: anyErrors.length > 0 ? 
        intl.formatMessage({
          defaultMessage: "Error",
          description: "error AccountConfirm message",
       }):
       intl.formatMessage({
        defaultMessage: "Account confirmed",
        description: "account confirmed AccountConfirm message",
      }),
      },
      { type: anyErrors.length > 0 ? "error" : "success", timeout: 5000 }
    );
  };

  React.useEffect(() => {
    this.accountManagerFn({
      variables: { email: query.email, token: query.token },
    }).then((result) => {
      const possibleErrors = result.data.confirmAccount.errors;
      displayConfirmationAlert(possibleErrors);
    }).catch(() => {
      const errors = [{
        message: intl.formatMessage({
          defaultMessage: "Something went wrong while activating your account.",
          description: "something went wrong AccountConfirm message",
       }),
      }];
      displayConfirmationAlert(errors);
    }).finally(() => {
      history.push(BASE_URL);
    });
  }, []);

  return (
    <TypedAccountConfirmMutation>
      {accountConfirm => {
        this.accountManagerFn = accountConfirm;
        return <div></div>;
      }}
    </TypedAccountConfirmMutation>
  );
};

export default AccountConfirm;
