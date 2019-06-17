import React from "react";
import NumberFormat from "react-number-format";

import { Form } from "src/components";
import * as S from "./styles";
import { IProps } from "./types";

const renderFieldError = (error?: string) =>
  !!error && <S.ErrorMessage>{error}</S.ErrorMessage>;

export const CreditCardForm: React.FC<IProps> = ({
  formRef,
  cardErrors: {
    number: cardNumberError,
    cvv: ccCscError,
    expirationMonth: expirationMonthError,
    expirationYear: expirationYearError,
  },
  cardText: { ccCsc: ccCscText, ccExp: ccExpText, ccNumber: ccNumberText },
  cardValues: { ccCsc, ccExp, ccNumber },
  focusedInputName,
  inputProps,
  handleSubmit,
}: IProps) => {
  return (
    <Form formRef={formRef} onSubmit={handleSubmit}>
      <S.PaymentInput error={!!cardNumberError}>
        <S.PaymentLabel
          isFocused={focusedInputName === "ccNumber" || !!ccNumber}
        >
          {ccNumberText}
        </S.PaymentLabel>
        <NumberFormat
          autoComplete="cc-number"
          format="#### #### #### ####"
          name="ccNumber"
          {...inputProps}
        />
        {renderFieldError(cardNumberError)}
      </S.PaymentInput>

      <S.Grid>
        <S.PaymentInput error={!!ccCscError}>
          <S.PaymentLabel isFocused={focusedInputName === "ccCsc" || !!ccCsc}>
            {ccCscText}
          </S.PaymentLabel>
          <NumberFormat
            autoComplete="cc-csc"
            format="####"
            name="ccCsc"
            {...inputProps}
          />
          {renderFieldError(ccCscError)}
        </S.PaymentInput>

        <S.PaymentInput error={!!(expirationMonthError || expirationYearError)}>
          <S.PaymentLabel isFocused={focusedInputName === "ccExp" || !!ccExp}>
            {ccExpText}
          </S.PaymentLabel>
          <NumberFormat
            autoComplete="cc-exp"
            format="## / ##"
            name="ccExp"
            {...inputProps}
          />
          {renderFieldError(expirationMonthError)}
          {renderFieldError(expirationYearError)}
        </S.PaymentInput>
      </S.Grid>
    </Form>
  );
};
