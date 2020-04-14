import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useMemo } from "react";

import { StripeCreditCardForm } from "../StripeCreditCardForm";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Stripe payment gateway.
 */
const StripePaymentGateway: React.FC<IProps> = ({
  config,
  href,
  processPayment,
  formRef,
  initialStatus,
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
      <StripeCreditCardForm formRef={formRef} processPayment={processPayment} />
    </Elements>
  );
};

export { StripePaymentGateway };
