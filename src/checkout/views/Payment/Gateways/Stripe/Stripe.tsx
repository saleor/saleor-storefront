import React from "react";

import { Elements, StripeProvider } from "react-stripe-elements";

import { ProviderProps } from "../../View";
import CardForm from "./CardForm";

export const Stripe = (props: ProviderProps) => {
  const apiKey = props.paymentGatewayConfig.find(
    ({ field }) => field === "api_key"
  ).value;
  return (
    <div>
      <StripeProvider apiKey={apiKey}>
        <Elements>
          <CardForm {...props} />
        </Elements>
      </StripeProvider>
    </div>
  );
};
