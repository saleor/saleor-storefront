import React, { useEffect, useState } from "react";

import { Elements, StripeProvider } from "react-stripe-elements";

import { ProviderProps } from "../../View";
import CardForm from "./CardForm";

export const Stripe = (props: ProviderProps) => {
  const [stripe, setStripe] = useState(null);

  const apiKey = props.paymentGatewayConfig.find(
    ({ field }) => field === "api_key"
  ).value;

  useEffect(() => {
    if (!(window as Window).Stripe) {
      const stripeJs = document.createElement("script");

      stripeJs.src = props.paymentGatewayHref;
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
        <CardForm {...props} />
      </Elements>
    </StripeProvider>
  );
};
