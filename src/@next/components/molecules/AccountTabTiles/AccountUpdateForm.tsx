import { Formik } from "formik";
import React from "react";
import { TextField } from "../TextField";

import { Button, ButtonLink } from "@components/atoms";
import * as S from "./styles";

import { buttonMessages, commonMessages } from "@saleor/intl";
import { useIntl } from "react-intl";

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
            <S.Form onSubmit={handleSubmit}>
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
                <ButtonLink type="button" color="secondary" onClick={hide}>
                  {intl.formatMessage(buttonMessages.cancel)}
                </ButtonLink>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  size="sm"
                >
                  {intl.formatMessage(buttonMessages.save)}
                </Button>
              </S.FormButtons>
            </S.Form>
          );
        }}
      </Formik>
    </>
  );
};
