import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useMemo } from "react";

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
  initialStatus,
  errors,
}: IProps) => {
  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  const stripePromise = useMemo(() => {
    if (apiKey) {
      return loadStripe(apiKey);
    }
    return null;
  }, [apiKey]);

  return (
    <Elements stripe={stripePromise}>
      <StripeCreditCardForm
        formId={formId}
        formRef={formRef}
        processPayment={processPayment}
        errors={errors}
      />
    </Elements>
  );
};

export { StripePaymentGateway };
