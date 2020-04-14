import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Formik } from "formik";
import React, { useState } from "react";

import { ErrorMessage, StripeInputElement } from "@components/atoms";
import { IFormError } from "@components/atoms/ErrorMessage/types";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Stripe credit card form.
 */
const StripeCreditCardForm: React.FC<IProps> = ({
  formRef,
  processPayment,
}: IProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errors, setErrors] = useState<IFormError[]>([]);

  const handleFormSubmit = async () => {
    // setLoadingState(true);
    const cartNumberElement = elements?.getElement(CardNumberElement);

    if (cartNumberElement) {
      const payload = await stripe?.createPaymentMethod({
        card: cartNumberElement,
        type: "card",
      });
      if (payload?.error) {
        const error = {
          ...payload.error,
          message: payload.error.message || "",
        };
        setErrors([error]);
      } else if (payload?.paymentMethod) {
        const { card, id } = payload.paymentMethod;
        // update({
        //   cardData: {
        //     ccType: card.brand,
        //     lastDigits: card.last4,
        //     token: id,
        //   },
        // });
        processPayment(id);
      }
    }
    // setLoadingState(false);
  };

  return (
    <Formik
      initialValues={null}
      onSubmit={async (values, { setSubmitting }) => {
        await handleFormSubmit();
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
      }) => (
        <S.Form ref={formRef} onSubmit={handleSubmit}>
          <S.Card>
            <StripeInputElement
              type="CardNumber"
              label="Card number"
              onChange={event => {
                handleChange(event);
                setErrors([]);
              }}
            />
            <StripeInputElement
              type="CardExpiry"
              label="Expiration date"
              onChange={event => {
                handleChange(event);
                setErrors([]);
              }}
            />
            <StripeInputElement
              type="CardCvc"
              label="CVC"
              onChange={event => {
                handleChange(event);
                setErrors([]);
              }}
            />
            <StripeInputElement
              type="PostalCode"
              label="Postal code"
              onChange={event => {
                handleChange(event);
                setErrors([]);
              }}
            />
          </S.Card>
          <ErrorMessage errors={errors} />
        </S.Form>
      )}
    </Formik>
  );
};

export { StripeCreditCardForm };
