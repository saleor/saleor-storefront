import { storiesOf } from "@storybook/react";
import React from "react";

import { CreditCardNumberWithIcon } from ".";

storiesOf(`@components/molecules/CreditCardWithIcon`, module).add(
  "default",
  () => (
    <CreditCardNumberWithIcon creditCardProvider="visa" last4Digits={1234} />
  )
);
