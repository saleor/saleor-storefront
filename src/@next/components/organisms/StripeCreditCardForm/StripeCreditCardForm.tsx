import { useElements, useStripe } from "@stripe/react-stripe-js";
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
  errors = [],
  onSubmit,
}: IProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [stripeErrors, setStripeErrors] = useState<IFormError[]>([]);

  const allErrors = [...errors, ...stripeErrors];

  return (
    <Formik
      initialValues={null}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(stripe, elements);
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
