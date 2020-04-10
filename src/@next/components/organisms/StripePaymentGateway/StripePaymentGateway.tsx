import React, { useEffect, useState } from "react";

import { Elements, StripeProvider } from "react-stripe-elements";

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
  const [stripe, setStripe] = useState(null);

  const apiKey = config.find(({ field }) => field === "api_key")?.value;

  useEffect(() => {
    if (!(window as Window).Stripe) {
      const stripeJs = document.createElement("script");

      stripeJs.src = href;
      stripeJs.async = true;
      stripeJs.onload = () => {
        setStripe((window as Window).Stripe(apiKey));
      };

      document.body.appendChild(stripeJs);
    } else {
      setStripe((window as Window).Stripe(apiKey));
    }
  }, []);

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeCreditCardForm
          formRef={formRef}
          processPayment={processPayment}
        />
      </Elements>
    </StripeProvider>
  );
};

export { StripePaymentGateway };
