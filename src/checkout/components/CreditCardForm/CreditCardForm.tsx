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
  cardErrors: { number: cardNumber, cvv, expirationMonth, expirationYear },
  cardValues: { ccCsc, ccExp, ccNumber },
  focusedInputName,
  inputProps,
  handleSubmit
}: ICreditCardForm) => {
  return (
    <Form formRef={formRef} onSubmit={handleSubmit}>
      <div className={generateClassName(cardNumber)}>
        <span
          className={generateLabelClassName(
            focusedInputName === "ccNumber",
            ccNumber
          )}
        >
          Number
        </span>
        <NumberFormat
          autoComplete="cc-number"
          format="#### #### #### ####"
          name="ccNumber"
          {...inputProps}
        />
      </div>
      {renderFieldError(cardNumber)}

      <div className="checkout-payment__form-grid">
        <div className={generateClassName(cvv)}>
          <span
            className={generateLabelClassName(
              focusedInputName === "ccCsc",
              ccCsc
            )}
          >
            CVC
          </span>
          <NumberFormat
            autoComplete="cc-csc"
            format="####"
            name="ccCsc"
            {...inputProps}
          />
          {renderFieldError(cvv)}
        </div>

        <div className={generateClassName(expirationMonth || expirationYear)}>
          <span
            className={generateLabelClassName(
              focusedInputName === "ccExp",
              ccExp
            )}
          >
            Expiry Date
          </span>
          <NumberFormat
            autoComplete="cc-exp"
            format="## / ##"
            name="ccExp"
            {...inputProps}
          />
          {renderFieldError(expirationMonth)}
          {renderFieldError(expirationYear)}
        </div>
      </div>
    </Form>
  );
};

export default CreditCardForm;
