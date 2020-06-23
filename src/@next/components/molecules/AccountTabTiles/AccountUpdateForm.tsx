import { Formik } from "formik";
import React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { Button, ButtonLink } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import { TextField } from "../TextField";

import * as S from "./styles";

export const AccountUpdateForm: React.FC<{
  handleSubmit: (data: any) => void;
  hide: () => void;
  initialValues: {
    firstName: string;
    lastName: string;
  };
}> = ({ handleSubmit, hide, initialValues }) => {
  const intl = useIntl();
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit({
            firstName: values.firstName,
            lastName: values.lastName,
          });
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          isSubmitting,
          isValid,
        }) => {
          return (
            <S.Form onSubmit={handleSubmit} data-test="accountUpdateForm">
              <S.ContentEditOneLine>
                <S.ContentExtendInput>
                  <TextField
                    name="firstName"
                    label={intl.formatMessage(commonMessages.firstName)}
                    type="text"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </S.ContentExtendInput>
                <S.ContentExtendInput>
                  <TextField
                    name="lastName"
                    label={intl.formatMessage(commonMessages.lastName)}
                    type="text"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </S.ContentExtendInput>
              </S.ContentEditOneLine>
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
