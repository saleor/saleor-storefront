import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { StringParam, useQueryParams } from "use-query-params";

import { Loader } from "@components/atoms";
import { paths } from "@paths";

import { useAccountConfirmMutation } from "./mutations";

import "./scss/index.scss";

export const AccountConfirmView: NextPage = () => {
  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });
  const { push } = useRouter();
  const alert = useAlert();
  const [mutation] = useAccountConfirmMutation(query);

  const displayConfirmationAlert = (errors: { message: string }[]) => {
    const hasErrors = errors.length > 0;
    alert.show(
      {
        content: hasErrors
          ? errors.map(({ message }) => message).join(" ")
          : "You can now log in",
        title: hasErrors ? "Error" : "Account confirmed",
      },
      { type: hasErrors ? "error" : "success", timeout: 5000 }
    );
  };

  useEffect(() => {
    (async () => {
      const { data, errors } = await mutation();

      if (errors?.length) {
        displayConfirmationAlert([
          {
            message: "Something went wrong while activating your account.",
          },
        ]);
      }

      if (data.confirmAccount.errors.length) {
        displayConfirmationAlert(data.confirmAccount.errors);
      }

      push(paths.home);
    })();
  }, []);

  return <Loader />;
};
