import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useQueryParams, StringParam } from "use-query-params";

import { TextField } from "@components/molecules";

import * as S from "./styles";
import { FormikProps, IProps } from "./types";
import { Button } from "@components/atoms";

const PasswordResetSchema = Yup.object().shape({
  retypedPassword: Yup.string()
    .min(2, "Please retype password")
    .required("This field is required")
    .oneOf([Yup.ref("password")], "Retyped password does not match"),
  password: Yup.string()
    .min(2, "Passowrd is to short!")
    .required("This field is required"),
});

const initialData: FormikProps = {
  password: "",
  retypedPassword: "",
};

export const PasswordReset: React.FC<IProps> = ({}: // destructure props here if needed
IProps) => {
  const [query] = useQueryParams({
    email: StringParam,
    token: StringParam,
  });

  const { email, token } = query;
  console.log(email, token);
  return (
    <S.Wrapper>
      <h3>Reset your password</h3>

      <p>Please provide new password</p>
      <Formik
        initialValues={initialData}
        validationSchema={PasswordResetSchema}
        onSubmit={values => {
          return 2 + 2;
        }}
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
                errors={
                  errors.password
                    ? [{ field: "password", message: errors.password }]
                    : undefined
                }
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
