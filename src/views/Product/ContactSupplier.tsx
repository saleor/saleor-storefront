import { Formik } from "formik";
import React from "react";
import { useAlert } from "react-alert";
import { FormattedMessage, useIntl } from "react-intl";

import { Button, Checkbox } from "@components/atoms";
import { InputSelect } from "@components/molecules/InputSelect";
import { TextField } from "@components/molecules/TextField";
import { commonMessages } from "@temp/intl";

import { TypedSendMessageMutation } from "./queries";
import * as S from "./styles";

type FormType = {
  message: string;
  quantityNumber: number;
  quantityType?: string;
  recommend?: boolean;
  isAnonymous?: boolean;
};

const QUANTITY_TYPE_OPTIONS: { text: string; value: string }[] = [
  {
    text: "test 1",
    value: "test1",
  },
  { text: "test 2", value: "test2" },
];

export const ContactSupplier = ({ productID, storeID }: any) => {
  const alert = useAlert();

  const initialValues: Partial<FormType> = {
    message: "",
    quantityNumber: 1,
    recommend: false,
    isAnonymous: false,
  };
  const intl = useIntl();

  const handleSubmit = (data: Partial<FormType>, sendMessage: any) => {
    sendMessage({
      variables: {
        id: productID,
        input: {
          message: data.message,
          quantity: data.quantityNumber,
          storeId: storeID,
          isAnonymous: data.isAnonymous,
        },
      },
    });
  };

  return (
    <S.Wrapper>
      <S.TileWrapper>
        <p style={{ marginLeft: "1rem" }}>Message Supplier</p>
      </S.TileWrapper>
      <S.Content>
        <TypedSendMessageMutation
          onError={err =>
            alert.show({ title: "Error" }, { type: "error", timeout: 5000 })
          }
          onCompleted={data => {
            if (data) {
              alert.show(
                { title: "Success" },
                { type: "success", timeout: 5000 }
              );
            }
          }}
        >
          {(sendMessage, { error }) => {
            return (
              <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values, sendMessage);
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
                    <S.Form
                      onSubmit={handleSubmit}
                      data-test="accountUpdateForm"
                    >
                      <S.ContentEditOneLine>
                        <S.ContentExtendInput>
                          <TextField
                            name="message"
                            label={intl.formatMessage(commonMessages.message)}
                            type="textarea"
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
                            type="text"
                            value={values.quantityNumber}
                            onBlur={handleBlur}
                            onChange={e => {
                              const isNum = /^\d+$/.test(e.target.value);
                              if (isNum || e.target.value.length === 0) {
                                handleChange(e);
                              }
                            }}
                          />
                        </S.ContentExtendInput>
                      </S.ContentEditOneLine>
                      <S.ContentEditOneLine>
                        <S.ContentExtendInput
                          style={{ marginBottom: "1.875rem" }}
                        >
                          <InputSelect
                            defaultValue={initialValues.quantityType}
                            label={intl.formatMessage(
                              commonMessages.quantityType
                            )}
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
                        onChange={() =>
                          setFieldValue("recommend", !values.recommend)
                        }
                      >
                        <FormattedMessage defaultMessage="Recommend matching suppliers if this supplier doesn’t contact me on Message Center within 24 hours. Request for Quotation" />
                      </Checkbox>

                      <Checkbox
                        name="isAnonymous"
                        checked={values.isAnonymous}
                        onChange={() =>
                          setFieldValue("isAnonymous", !values.isAnonymous)
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
            );
          }}
        </TypedSendMessageMutation>
      </S.Content>
    </S.Wrapper>
  );
};
