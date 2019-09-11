import { Formik } from "formik";
import React from "react";
import { TextField } from "../TextField";

import * as S from "./styles";

export const PasswordChangeForm: React.FC = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        confirmPassword: "",
        newPassword: "",
        oldPassword: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
      }}
      validateOnChange={false}
      validate={values => {
        const errors = {
          confirmPassword: [],
          newPassword: [],
        };
        if (values.confirmPassword !== values.newPassword) {
          errors.confirmPassword = [
            { field: "confirmPassword", message: "Passwords do not match" },
          ];
          errors.newPassword = [
            { field: "newPassword", message: "Passwords do not match" },
          ];
        }
        return errors;
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched,
      }) => {
        return (
          <S.Form onSubmit={handleSubmit}>
            <TextField
              name="oldPassword"
              label="Old Password"
              type="password"
              value={values.oldPassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField
              name="newPassword"
              label="New Password"
              type="password"
              value={values.newPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={
                touched.newPassword &&
                touched.confirmPassword &&
                errors.newPassword
              }
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              errors={
                touched.newPassword &&
                touched.confirmPassword &&
                errors.confirmPassword
              }
            />
          </S.Form>
        );
      }}
    </Formik>
  );
};
