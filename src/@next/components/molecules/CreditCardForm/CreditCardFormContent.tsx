import React from "react";
import NumberFormat from "react-number-format";

import { ErrorMessage } from "@components/atoms";
import { TextField } from "@components/molecules";
import * as S from "./styles";
import { PropsWithFormik } from "./types";

const createErrorsList = (error?: string) =>
  (error && [{ message: error }]) || [];

const getInputProps = (
  disabled: boolean,
  handleChange: (e: React.ChangeEvent) => void
) => (labelText: string) => ({
  customInput: TextField,
  disabled,
  label: labelText,
  onChange: handleChange,
});

export const CreditCardFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  cardErrors: {
    number: cardNumberError,
    cvv: ccCscError,
    expirationMonth: expirationMonthError,
    expirationYear: expirationYearError,
  },
  disabled,
  labelsText: { ccCsc: ccCscText, ccExp: ccExpText, ccNumber: ccNumberText },
  handleSubmit,
  handleChange,
}: PropsWithFormik) => {
  const basicInputProps = getInputProps(disabled, handleChange);
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <S.PaymentInput error={!!cardNumberError}>
        <NumberFormat
          autoComplete="cc-number"
          format="#### #### #### ####"
          name="ccNumber"
          {...basicInputProps(ccNumberText)}
        />
        <ErrorMessage errors={createErrorsList(cardNumberError)} />
      </S.PaymentInput>

      <S.Grid>
        <S.PaymentInput error={!!ccCscError}>
          <NumberFormat
            autoComplete="cc-csc"
            format="####"
            name="ccCsc"
            {...basicInputProps(ccCscText)}
          />
          <ErrorMessage errors={createErrorsList(ccCscError)} />
        </S.PaymentInput>

        <S.PaymentInput error={!!(expirationMonthError || expirationYearError)}>
          <NumberFormat
            autoComplete="cc-exp"
            format="## / ##"
            name="ccExp"
            {...basicInputProps(ccExpText)}
          />
          <ErrorMessage
            errors={[
              ...createErrorsList(expirationMonthError),
              ...createErrorsList(expirationYearError),
            ]}
          />
        </S.PaymentInput>
      </S.Grid>
    </form>
  );
};
