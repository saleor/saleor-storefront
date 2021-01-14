import { setAuthToken, useSetPassword } from "@saleor/sdk";
import { Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { StringParam, useQueryParams } from "use-query-params";
import * as Yup from "yup";

import { ResetPasswordForm } from "@components/molecules";
import { paths } from "@paths";

import * as S from "./styles";
import { FormikProps } from "./types";

const PasswordResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Password is to short!")
    .required("This field is required"),
  retypedPassword: Yup.string()
    .min(2, "Please retype password")
    .required("This field is required")
    .oneOf([Yup.ref("password")], "Retyped password does not match"),
});

const initialData: FormikProps = {
  password: "",
  retypedPassword: "",
};

export const PasswordReset: NextPage = () => {
  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });
  const { push } = useRouter();

  const [tokenError, setTokenError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");

  const [setPassword, { data, error: graphqlErrors }] = useSetPassword();

  React.useEffect(() => {
    if (data && data.setPassword && data.setPassword.token) {
      setAuthToken(data.setPassword.token);
      push(paths.home);
    }

    if (graphqlErrors?.extraInfo?.userInputErrors) {
      graphqlErrors.extraInfo.userInputErrors.forEach(error => {
        if (error.field === "token") setTokenError(true);
        else setTokenError(false);
        if (error.field === "password") setPasswordError(error.message);
        else setPasswordError("");
      });
    }
  }, [data, graphqlErrors]);

  const { email, token } = query;

  if (!email || !token) {
    push(paths.home);
  }

  const onSubmit = (values: FormikProps) => {
    if (email && token && values.password) {
      setPassword({
        email,
        password: values.password,
        token,
      });
    }
  };

  return (
    <S.Wrapper>
      <Formik
        initialValues={initialData}
        validationSchema={PasswordResetSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleChange, handleBlur, values, errors, handleSubmit }) => {
          return (
            <ResetPasswordForm
              {...{
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                passwordError,
                tokenError,
                values,
              }}
            />
          );
        }}
      </Formik>
    </S.Wrapper>
  );
};
