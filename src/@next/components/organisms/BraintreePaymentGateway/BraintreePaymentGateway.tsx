import React, { useState } from "react";

import { ErrorMessage } from "@components/atoms";
import { CreditCardForm } from "@components/organisms";
import { IFormError } from "@types";

import {
  braintreePayment,
  ErrorData,
  ICardInputs,
  ICardPaymentInput,
  IPaymentCardError,
  PaymentData,
} from "../../../../core/payments/braintree";
import { maybe, removeEmptySpaces } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    number: null,
  },
  nonFieldError: "",
};

const BraintreePaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  postalCode,
  onError,
}: IProps) => {
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);

  const clientToken = config.find(({ field }) => field === "client_token")
    ?.value;

  const [cardErrors, setCardErrors] = React.useState<ErrorData>(
    INITIAL_CARD_ERROR_STATE
  );

  const setCardErrorsHelper = (errors: IPaymentCardError[]) =>
    errors.map(({ field, message }: IPaymentCardError) =>
      setCardErrors(({ fieldErrors }) => ({
        fieldErrors: {
          ...fieldErrors,
          [field]: { field, message },
        },
      }))
    );

  const tokenizeCcCard = async (creditCard: ICardPaymentInput) => {
    setCardErrors(INITIAL_CARD_ERROR_STATE);
    try {
      if (clientToken) {
        const cardData = (await braintreePayment(
          clientToken,
          creditCard
        )) as PaymentData;
        return cardData;
      }
      const braintreeTokenErrors = [
        {
          message:
            "Braintree gateway misconfigured. Client token not provided.",
        },
      ];
      setSubmitErrors(braintreeTokenErrors);
      onError(braintreeTokenErrors);
    } catch (errors) {
      setCardErrorsHelper(errors);
      onError(errors);
      return null;
    }
  };

  const handleSubmit = async (formData: ICardInputs) => {
    setSubmitErrors([]);
    const creditCard: ICardPaymentInput = {
      billingAddress: { postalCode },
      cvv: removeEmptySpaces(maybe(() => formData.ccCsc, "") || ""),
      expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "") || ""),
      number: removeEmptySpaces(maybe(() => formData.ccNumber, "") || ""),
    };
    const payment = await tokenizeCcCard(creditCard);
    if (payment?.token) {
      processPayment(payment?.token, {
        brand: payment?.ccType,
        firstDigits: null,
        lastDigits: payment?.lastDigits,
        expMonth: null,
        expYear: null,
      });
    } else {
      const braintreePayloadErrors = [
        {
          message:
            "Payment submission error. Braintree gateway returned no token in payload.",
        },
      ];
      setSubmitErrors(braintreePayloadErrors);
      onError(braintreePayloadErrors);
    }
  };

  const allErrors = [...errors, ...submitErrors];

  return (
    <S.Wrapper data-test="braintreePaymentGateway">
      <CreditCardForm
        formRef={formRef}
        formId={formId}
        cardErrors={cardErrors.fieldErrors}
        labelsText={{
          ccCsc: "CVC",
          ccExp: "ExpiryDate",
          ccNumber: "Number",
        }}
        disabled={false}
        handleSubmit={handleSubmit}
      />
      <ErrorMessage errors={allErrors} />
    </S.Wrapper>
  );
};

export { BraintreePaymentGateway };
