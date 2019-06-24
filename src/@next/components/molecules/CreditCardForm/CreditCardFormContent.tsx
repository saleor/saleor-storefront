import { compact } from "lodash";
import React from "react";
import NumberFormat from "react-number-format";

import { TextField } from "@components/molecules";
import * as S from "./styles";
import { PropsWithFormik } from "./types";

const getInputProps = (
  disabled: boolean,
  handleChange: (e: React.ChangeEvent) => void
) => (labelText: string, errors: any) => ({
  customInput: TextField,
  disabled,
  errors: compact(errors),
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
    <S.PaymentForm ref={formRef} onSubmit={handleSubmit}>
      <S.PaymentInput>
        <NumberFormat
          autoComplete="cc-number"
          format="#### #### #### ####"
          name="ccNumber"
          {...basicInputProps(ccNumberText, [cardNumberError])}
        />
      </S.PaymentInput>

      <S.Grid>
        <S.PaymentInput>
          <NumberFormat
            autoComplete="cc-csc"
            format="####"
            name="ccCsc"
            {...basicInputProps(ccCscText, [ccCscError])}
          />
        </S.PaymentInput>

        <S.PaymentInput>
          <NumberFormat
            autoComplete="cc-exp"
            format="## / ##"
            name="ccExp"
            {...basicInputProps(ccExpText, [
              expirationMonthError,
              expirationYearError,
            ])}
          />
        </S.PaymentInput>
      </S.Grid>
    </S.PaymentForm>
  );
};
