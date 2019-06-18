import "./scss/index.scss";

import React from "react";

import { CreditCardForm } from "@components/molecules";

import { GatewaysEnum } from "../../../../../../types/globalTypes";
import { TextField } from "../../../../../components";

import {
  braintreePayment,
  ErrorData,
  ICardName,
  IPaymentCardError,
  PaymentData
} from "../../../../../core/payments/braintree";
import { maybe, removeEmptySpaces } from "../../../../../core/utils";
// import { CreditCardForm } from "../../../../components";
import { ProviderProps } from "../../View";

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
    number: "",
  },
  nonFieldError: "",
};

const CreditCard = ({
  checkout: {
    update,
    checkout: {
      billingAddress: { postalCode },
    },
  },
  formRef,
  loading,
  setLoadingState,
  paymentClientToken,
  processPayment,
}: ProviderProps) => {
  {
    const [cardErrors, setCardErrors] = React.useState<ErrorData>(
      INITIAL_CARD_ERROR_STATE
    );
    const [focusedInput, setFocusedInput] = React.useState<ICardName | null>(
      null
    );

    const handleOnFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) =>
        setFocusedInput(e.target.name as ICardName),
      [focusedInput]
    );

    const handleOnBlur = React.useCallback(() => setFocusedInput(null), []);

    const setCardErrorsHelper = (errors: IPaymentCardError[]) =>
      errors.map(({ field, message }: IPaymentCardError) =>
        setCardErrors(({ fieldErrors }) => ({
          fieldErrors: {
            ...fieldErrors,
            [field]: message,
          },
        }))
      );

    const tokenizeCcCard = async creditCard => {
      setCardErrors(INITIAL_CARD_ERROR_STATE);
      try {
        const cardData = (await braintreePayment(
          paymentClientToken,
          creditCard
        )) as PaymentData;
        await update({ cardData });
        return cardData.token;
      } catch (errors) {
        setCardErrorsHelper(errors);
        return null;
      }
    };

    const handleSubmit = async formData => {
      setLoadingState(true);
      const creditCard = {
        billingAddress: { postalCode },
        cvv: removeEmptySpaces(maybe(() => formData.ccCsc, "")),
        expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "")),
        number: removeEmptySpaces(maybe(() => formData.ccNumber, "")),
      };
      const token = await tokenizeCcCard(creditCard);
      processPayment(token, GatewaysEnum.BRAINTREE);
      setLoadingState(false);
    };

    const getInputProps = () => ({
      customInput: TextField,
      disabled: loading,
      onBlur: handleOnBlur,
      onFocus: handleOnFocus,
    });

    return (
      <CreditCardForm
        formRef={formRef}
        cardErrors={cardErrors.fieldErrors}
        cardText={{
          ccCsc: "CVC",
          ccExp: "ExpiryDate",
          ccNumber: "Number",
        }}
        focusedInputName={focusedInput}
        inputProps={getInputProps()}
        handleSubmit={handleSubmit}
      />
    );
  }
};

export default CreditCard;
