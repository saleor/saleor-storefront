import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { StringParam, useQueryParams } from "use-query-params";

import { TextField } from "@components/molecules";
import { setAuthToken } from "@sdk/auth";
import { useSetPassword } from "@sdk/react";
import { BASE_URL } from "../../../../core/config";

import { Button } from "@components/atoms";
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

  const [wrongToken, setWrongToken] = React.useState(false);

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
        if (error.field === "token") {
          setWrongToken(true);
        }
      });
    }
  }, [data, graphqlErrors]);

  const { email, token } = query;
  if (!email || !token) {
    history.push(BASE_URL);
  }

  const onSubmit = async (values: FormikProps) => {
    if (email && token && values.password) {
      await setPassword({
        email,
        password: values.password,
        token,
      });
    }
  };

  const parsePasswordErrors = (formikErrors: any, graphqlErrors: any) => {
    if (formikErrors.password) {
      return [{ field: "password", message: formikErrors.password }];
    }

    if (graphqlErrors && graphqlErrors.extraInfo) {
      return graphqlErrors.extraInfo.userInputErrors.filter(
        (error: { field: string; message: string }) => {
          if (error.field === "password") {
            return {
              field: "password",
              message: error.message,
            };
          }
        }
      );
    }
  };
  return (
    <S.Wrapper>
      <h3>Reset your password</h3>

      <p>Please provide new password</p>
      {wrongToken && (
        <S.GeneralError>
          It seems that token for password reset is not valid anymore.
        </S.GeneralError>
      )}
      <Formik
        initialValues={initialData}
        validationSchema={PasswordResetSchema}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleChange, handleBlur, values, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <S.InputFields>
              <TextField
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                errors={parsePasswordErrors(errors, graphqlErrors)}
              />
              <TextField
                label="Retype password"
                onBlur={handleBlur}
                name="retypedPassword"
                onChange={handleChange}
                type="password"
                value={values.retypedPassword}
                errors={
                  errors.retypedPassword
                    ? [
                        {
                          field: "retypedPassword",
                          message: errors.retypedPassword,
                        },
                      ]
                    : undefined
                }
              />
            </S.InputFields>

            <Button type="submit" fullWidth={true}>
              SET NEW PASSWORD
            </Button>
          </form>
        )}
      </Formik>
    </S.Wrapper>
  );
};
