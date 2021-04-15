import { Formik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Button, Checkbox } from "@components/atoms";
import { InputSelect } from "@components/molecules/InputSelect";
import { TextField } from "@components/molecules/TextField";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";

type FormType = {
  message: string;
  quantityNumber: number;
  quantityType: string;
  recommend: boolean;
  agreeShare: boolean;
};

const QUANTITY_TYPE_OPTIONS: { text: string; value: string }[] = [
  {
    text: "test 1",
    value: "test1",
  },
  { text: "test 2", value: "test2" },
];

export const ContactSupplier: React.FC = () => {
  const initialValues: Partial<FormType> = {
    quantityNumber: 1,
    recommend: false,
    agreeShare: false,
  };
  const intl = useIntl();

  const handleSubmit = (data: Partial<FormType>) => {};

  return (
    <S.Wrapper>
      <S.TileWrapper>
        <p style={{ marginLeft: "1rem" }}>Send your message to this supplier</p>
      </S.TileWrapper>
      <S.Content>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
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
            setFieldValue,
            errors,
          }) => {
            return (
              <S.Form onSubmit={handleSubmit} data-test="accountUpdateForm">
                <S.ContentEditOneLine>
                  <S.ContentExtendInput>
                    <TextField
                      name="message"
                      label={intl.formatMessage(commonMessages.message)}
                      type="text"
                      value={values.message}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      errors={
                        errors.message
                          ? [
                              {
                                field: "message",
                                message: errors.message,
                              },
                            ]
                          : undefined
                      }
                    />
                  </S.ContentExtendInput>
                </S.ContentEditOneLine>
                <S.ContentEditOneLine>
                  <S.ContentExtendInput>
                    <TextField
                      name="quantityNumber"
                      label={intl.formatMessage(commonMessages.quantity)}
                      type="number"
                      value={values.quantityNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </S.ContentExtendInput>
                </S.ContentEditOneLine>
                <S.ContentEditOneLine>
                  <S.ContentExtendInput>
                    <InputSelect
                      defaultValue={initialValues.quantityType}
                      label={intl.formatMessage(commonMessages.quantityType)}
                      name="quantityType"
                      options={QUANTITY_TYPE_OPTIONS}
                      value={
                        values!.quantityType &&
                        QUANTITY_TYPE_OPTIONS &&
                        QUANTITY_TYPE_OPTIONS!.find(
                          option => option.value === values!.quantityType
                        )
                      }
                      onChange={(value: any, name: any) =>
                        setFieldValue(name, value.value)
                      }
                      optionLabelKey="text"
                      optionValueKey="value"
                      autoComplete="value"
                    />
                  </S.ContentExtendInput>
                </S.ContentEditOneLine>

                <Checkbox
                  name="recommend"
                  checked={values.recommend}
                  onChange={() => setFieldValue("recommend", !values.recommend)}
                >
                  <FormattedMessage defaultMessage="Recommend matching suppliers if this supplier doesn’t contact me on Message Center within 24 hours. Request for Quotation" />
                </Checkbox>

                <Checkbox
                  name="agreeShare"
                  checked={values.agreeShare}
                  onChange={() =>
                    setFieldValue("agreeShare", !values.agreeShare)
                  }
                >
                  <FormattedMessage defaultMessage="I agree to share my Business Card to the supplier." />
                </Checkbox>

                <S.FormButtons>
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
      </S.Content>
    </S.Wrapper>
  );
};
