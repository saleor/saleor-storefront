import { CardNumberElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import React, { useMemo, useState } from "react";

import { IFormError } from "@types";

import { StripeCreditCardForm } from "../StripeCreditCardForm";

import { IProps } from "./types";

/**
 * Stripe payment gateway.
 */
const StripePaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
}: IProps) => {
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);

  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  const stripePromise = useMemo(() => {
    if (apiKey) {
      return loadStripe(apiKey);
    }
    return null;
  }, [apiKey]);

  const handleFormSubmit = async (
    stripe: Stripe | null,
    elements: StripeElements | null
  ) => {
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
        setSubmitErrors([error]);
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

  const allErrors = [...errors, ...submitErrors];

  return (
    <Elements stripe={stripePromise}>
      <StripeCreditCardForm
        formId={formId}
        formRef={formRef}
        errors={allErrors}
        onSubmit={handleFormSubmit}
      />
    </Elements>
  );
};

export { StripePaymentGateway };
