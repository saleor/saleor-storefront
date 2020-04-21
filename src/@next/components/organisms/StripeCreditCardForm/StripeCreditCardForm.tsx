import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Formik } from "formik";
import React, { useState } from "react";

import { ErrorMessage, StripeInputElement } from "@components/atoms";
import { IFormError } from "@types";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Stripe credit card form.
 */
const StripeCreditCardForm: React.FC<IProps> = ({
  formRef,
  formId,
  processPayment,
  errors = [],
}: IProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [stripeErrors, setStripeErrors] = useState<IFormError[]>([]);

  const handleFormSubmit = async () => {
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
        setStripeErrors([error]);
      } else if (payload?.paymentMethod) {
        const { card, id } = payload.paymentMethod;
        processPayment(id, {
          brand: card?.brand,
          expMonth: card?.exp_month,
          expYear: card?.exp_year,
          lastDigits: card?.last4,
        });
      }
    }
  };

  const allErrors = [...errors, ...stripeErrors];

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
        <S.Form id={formId} ref={formRef} onSubmit={handleSubmit}>
          <S.Card>
            <S.CardNumberField>
              <StripeInputElement
                type="CardNumber"
                label="Card number"
                onChange={event => {
                  handleChange(event);
                  setStripeErrors([]);
                }}
              />
            </S.CardNumberField>
            <S.CardExpiryField>
              <StripeInputElement
                type="CardExpiry"
                label="Expiration date"
                onChange={event => {
                  handleChange(event);
                  setStripeErrors([]);
                }}
              />
            </S.CardExpiryField>
            <S.CardCvcField>
              <StripeInputElement
                type="CardCvc"
                label="CVC"
                onChange={event => {
                  handleChange(event);
                  setStripeErrors([]);
                }}
              />
            </S.CardCvcField>
          </S.Card>
          <ErrorMessage errors={allErrors} />
        </S.Form>
      )}
    </Formik>
  );
};

export { StripeCreditCardForm };
