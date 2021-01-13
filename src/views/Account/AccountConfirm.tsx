import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import { StringParam, useQueryParams } from "use-query-params";

import { Loader } from "@components/atoms";
import { paths } from "@paths";

import { TypedAccountConfirmMutation } from "./queries";

import "./scss/index.scss";

const AccountConfirm: NextPage = () => {
  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });
  const { push } = useRouter();
  const alert = useAlert();
  const accountManagerFnRef = useRef(null);

  const displayConfirmationAlert = anyErrors => {
    alert.show(
      {
        content:
          anyErrors.length > 0
            ? anyErrors.map(error => error.message).join(" ")
            : "You can now log in",
        title: anyErrors.length > 0 ? "Error" : "Account confirmed",
      },
      { type: anyErrors.length > 0 ? "error" : "success", timeout: 5000 }
    );
  };

  useEffect(() => {
    const mutateFn = accountManagerFnRef.current;

    if (mutateFn) {
      mutateFn({
        variables: { email: query.email, token: query.token },
      })
        .then(result => {
          const possibleErrors = result.data.confirmAccount.errors;
          displayConfirmationAlert(possibleErrors);
        })
        .catch(() => {
          const errors = [
            { message: "Something went wrong while activating your account." },
          ];
          displayConfirmationAlert(errors);
        })
        .finally(() => push(paths.home));
    }
  }, [accountManagerFnRef]);

  return (
    <TypedAccountConfirmMutation>
      {accountConfirm => {
        accountManagerFnRef.current = accountConfirm;
        return <Loader />;
      }}
    </TypedAccountConfirmMutation>
  );
};

export default AccountConfirm;
