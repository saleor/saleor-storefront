import { Formik } from "formik";
import React from "react";
import { TextField } from "../TextField";

import { Button, ButtonLink } from "@components/atoms";
import { IFormError } from "@types";
import * as S from "./styles";

export const PasswordChangeForm: React.FC<{
  handleSubmit: (data: any) => void;
  hide: () => void;
  error?: IFormError[];
}> = ({ handleSubmit, hide, error }) => {
  const fieldErrors: any = {};

  if (error) {
    error.map(({ field, message }: { field?: string; message?: string }) => {
      if (field && message) {
        fieldErrors[field] = fieldErrors[field]
          ? [...fieldErrors[field], { message }]
          : [{ message }];
      }
    });
  }
  return (
    <>
      <Formik
        initialValues={{
          confirmPassword: "",
          newPassword: "",
          oldPassword: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit({
            newPassword: values.newPassword,
            oldPassword: values.oldPassword,
          });
          setSubmitting(false);
        }}
        validateOnChange={false}
        validate={values => {
          const errors: {
            oldPassword?: string;
            confirmPassword?: string;
            newPassword?: string;
          } = {};
          if (!values.confirmPassword) {
            errors.confirmPassword = "Required field";
          }
          if (!values.newPassword) {
            errors.newPassword = "Required field";
          }
          if (!values.oldPassword) {
            errors.oldPassword = "Required field";
          }
          if (values.confirmPassword !== values.newPassword) {
            errors.confirmPassword = "Passwords do not match";
            errors.newPassword = "Passwords do not match";
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
          isSubmitting,
          isValid,
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
                errors={
                  touched.oldPassword && errors.oldPassword
                    ? [{ message: errors.oldPassword }]
                    : undefined || fieldErrors!.oldPassword
                }
              />
              <TextField
                name="newPassword"
                label="New Password"
                type="password"
                value={values.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                errors={
                  touched.newPassword && errors.newPassword
                    ? [{ message: errors.newPassword }]
                    : undefined || fieldErrors!.newPassword
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
                  touched.confirmPassword && errors.confirmPassword
                    ? [{ message: errors.confirmPassword }]
                    : undefined || fieldErrors!.confirmPassword
                }
              />
              <S.FormButtons>
                <ButtonLink type="button" color="secondary" onClick={hide}>
                  Cancel
                </ButtonLink>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  size="sm"
                >
                  Save
                </Button>
              </S.FormButtons>
            </S.Form>
          );
        }}
      </Formik>
    </>
  );
};
