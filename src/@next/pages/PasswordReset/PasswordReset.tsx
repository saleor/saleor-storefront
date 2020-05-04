import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { StringParam, useQueryParams } from "use-query-params";

import { setAuthToken } from "@sdk/auth";
import { useSetPassword } from "@sdk/react";
import { BASE_URL } from "@temp/core/config";

import { ResetPasswordForm } from "@components/molecules";
import * as S from "./styles";
import { FormikProps, IProps } from "./types";

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

export const PasswordReset: React.FC<IProps> = ({ history }: IProps) => {
  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });

  const [tokenError, setTokenError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");

  const [setPassword, { data, error: graphqlErrors }] = useSetPassword();

  React.useEffect(() => {
    if (data && data.setPassword && data.setPassword.token) {
      setAuthToken(data.setPassword.token);
      history.push(BASE_URL);
    }
    if (
      graphqlErrors &&
      graphqlErrors.extraInfo &&
      graphqlErrors.extraInfo.userInputErrors
    ) {
      graphqlErrors.extraInfo.userInputErrors.filter(error => {
        error.field === "token" ? setTokenError(true) : setTokenError(false);
        error.field === "password"
          ? setPasswordError(error.message)
          : setPasswordError("");
      });
    }
  }, [data, graphqlErrors]);

  const { email, token } = query;

  if (!email || !token) {
    history.push(BASE_URL);
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
