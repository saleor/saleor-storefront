import * as React from "react";
import { useAlert } from "react-alert";

import { StringParam, useQueryParams } from 'use-query-params';

import { BASE_URL } from "../../core/config";

import { RouteComponentProps } from "react-router";
import { TypedAccountConfirmMutation } from "./queries";

import "./scss/index.scss";


const AccountConfirm: React.FC<RouteComponentProps> = ({ history }) => {

  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });

  const alert = useAlert();

  React.useEffect(() => {
    const promise = this.accountManagerFn({
      variables: {email: query.email, token: query.token},
    });
    promise.then((result) => {
      const errors = result.data.confirmAccount.errors;
      {
        alert.show(
          {
            content: errors.length > 0 ? errors.map(error => error.message).join(" "): "You can now log in",
            title: errors.length > 0 ? "Error": "Account confirmed",
          },
          { type: errors.length > 0 ? "error" : "success", timeout: 5000 }
        );
      }
    });
    history.push(BASE_URL);
  });

  return (
      <TypedAccountConfirmMutation
        variables={{email: query.email, token: query.token}}
      >
      {(accountConfirm) => {
        this.accountManagerFn = accountConfirm;
        return (<div></div>);
      }}
    </TypedAccountConfirmMutation>
  );
};

export default AccountConfirm;
