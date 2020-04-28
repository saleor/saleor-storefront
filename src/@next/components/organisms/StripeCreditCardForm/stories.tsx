import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import { StripeCreditCardForm } from ".";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const onSubmit = action("onSubmit");

storiesOf("@components/organisms/StripeCreditCardForm", module)
  .addParameters({ component: StripeCreditCardForm })
  .add("default", () => (
    <Elements stripe={stripePromise}>
      <StripeCreditCardForm onSubmit={async () => onSubmit()} />
    </Elements>
  ));
