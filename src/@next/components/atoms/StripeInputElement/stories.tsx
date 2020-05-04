import { storiesOf } from "@storybook/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import { StripeInputElement } from ".";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

storiesOf("@components/atoms/StripeInputElement", module)
  .addParameters({ component: StripeInputElement })
  .add("cart number input", () => (
    <Elements stripe={stripePromise}>
      <StripeInputElement type="CardNumber" />
    </Elements>
  ))
  .add("cart cvc input", () => (
    <Elements stripe={stripePromise}>
      <StripeInputElement type="CardCvc" />
    </Elements>
  ))
  .add("cart expiry input", () => (
    <Elements stripe={stripePromise}>
      <StripeInputElement type="CardExpiry" />
    </Elements>
  ));
