import { compact } from "lodash";
import React, { useCallback } from "react";
import NumberFormat from "react-number-format";

import { TextField } from "@components/molecules";
import * as S from "./styles";
import { CardErrors, PropsWithFormik } from "./types";

const getInputProps = (
  disabled: boolean,
  handleChange: (e: React.ChangeEvent) => void
) => (label: string, errors: CardErrors, value: string) => ({
  customInput: TextField,
  disabled,
  errors: compact(errors),
  label,
  onChange: handleChange,
  value,
});

export const CreditCardFormContent: React.FC<PropsWithFormik> = ({
  formRef,
  formId,
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
  values,
}: PropsWithFormik) => {
  const basicInputProps = useCallback(getInputProps(disabled, handleChange), [
    disabled,
    handleChange,
  ]);

  return (
    <S.PaymentForm ref={formRef} id={formId} onSubmit={handleSubmit}>
      <S.PaymentInput>
        <NumberFormat
          autoFocus
          autoComplete="cc-number"
          format="#### #### #### ####"
          name="ccNumber"
          {...basicInputProps(ccNumberText, [cardNumberError], values.ccNumber)}
        />
      </S.PaymentInput>

      <S.Grid>
        <S.PaymentInput>
          <NumberFormat
            autoComplete="cc-csc"
            format="####"
            name="ccCsc"
            {...basicInputProps(ccCscText, [ccCscError], values.ccCsc)}
          />
        </S.PaymentInput>

        <S.PaymentInput>
          <NumberFormat
            autoComplete="cc-exp"
            format="## / ##"
            name="ccExp"
            {...basicInputProps(
              ccExpText,
              [expirationMonthError, expirationYearError],
              values.ccExp
            )}
          />
        </S.PaymentInput>
      </S.Grid>
    </S.PaymentForm>
  );
};
