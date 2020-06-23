import { Formik } from "formik";
import React from "react";
import { useIntl, FormattedMessage } from "react-intl";

import { Button, ButtonLink } from "@components/atoms";
import { commonMessages } from "@temp/intl";
import { IFormError } from "@types";
import { TextField } from "../TextField";
import * as S from "./styles";

export const PasswordChangeForm: React.FC<{
  handleSubmit: (data: any) => void;
  hide: () => void;
  error?: IFormError[];
}> = ({ handleSubmit, hide, error }) => {
  const intl = useIntl();
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
            errors.confirmPassword = intl.formatMessage({
              defaultMessage: "Required field",
            });
          }
          if (!values.newPassword) {
            errors.newPassword = intl.formatMessage({
              defaultMessage: "Required field",
            });
          }
          if (!values.oldPassword) {
            errors.oldPassword = intl.formatMessage({
              defaultMessage: "Required field",
            });
          }
          if (values.confirmPassword !== values.newPassword) {
            errors.confirmPassword = intl.formatMessage({
              defaultMessage: "Passwords do not match",
            });
            errors.newPassword = intl.formatMessage({
              defaultMessage: "Passwords do not match",
            });
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
            <S.Form onSubmit={handleSubmit} data-test="changePasswordForm">
              <TextField
                name="oldPassword"
                label={intl.formatMessage({ defaultMessage: "Old Password" })}
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
                label={intl.formatMessage({ defaultMessage: "New Password" })}
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
                label={intl.formatMessage({
                  defaultMessage: "Confirm Password",
                })}
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
                <ButtonLink
                  testingContext="cancelButton"
                  type="button"
                  color="secondary"
                  onClick={hide}
                >
                  <FormattedMessage {...commonMessages.cancel} />
                </ButtonLink>
                <Button
                  testingContext="submit"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  size="sm"
                >
                  <FormattedMessage {...commonMessages.save} />
                </Button>
              </S.FormButtons>
            </S.Form>
          );
        }}
      </Formik>
    </>
  );
};
