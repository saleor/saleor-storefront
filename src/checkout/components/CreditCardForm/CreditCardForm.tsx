import classNames from "classnames";
import React from "react";
import NumberFormat from "react-number-format";

import { Form } from "../../../components";
import { ICreditCardForm } from "./customTypes";

const FOCUS_CLASS = "input__label--focus";

const renderFieldError = (error: string) =>
  error ? (
    <span className="input__error checkout-payment__error">{error}</span>
  ) : null;

const generateClassName = (error: string) =>
  classNames("input__payment", { "checkout-payment__field-error": !!error });

const generateLabelClassName = (isFocused: boolean, value: string) =>
  classNames("input__label", { [`${FOCUS_CLASS}`]: isFocused || !!value });

export const CreditCardForm = ({
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
}: ICreditCardForm) => (
  <Form formRef={formRef} onSubmit={handleSubmit}>
    <div className={generateClassName(cardNumberError)}>
      <span
        className={generateLabelClassName(
          focusedInputName === "ccNumber",
          ccNumber
        )}
      >
        {ccNumberText}
      </span>
      <NumberFormat
        autoComplete="cc-number"
        format="#### #### #### ####"
        name="ccNumber"
        {...inputProps}
      />
      {renderFieldError(cardNumberError)}
    </div>

    <div className="checkout-payment__form-grid">
      <div className={generateClassName(ccCscError)}>
        <span
          className={generateLabelClassName(
            focusedInputName === "ccCsc",
            ccCsc
          )}
        >
          {ccCscText}
        </span>
        <NumberFormat
          autoComplete="cc-csc"
          format="####"
          name="ccCsc"
          {...inputProps}
        />
        {renderFieldError(ccCscError)}
      </div>

      <div
        className={generateClassName(
          expirationMonthError || expirationYearError
        )}
      >
        <span
          className={generateLabelClassName(
            focusedInputName === "ccExp",
            ccExp
          )}
        >
          {ccExpText}
        </span>
        <NumberFormat
          autoComplete="cc-exp"
          format="## / ##"
          name="ccExp"
          {...inputProps}
        />
        {renderFieldError(expirationMonthError)}
        {renderFieldError(expirationYearError)}
      </div>
    </div>
  </Form>
);

export default CreditCardForm;
