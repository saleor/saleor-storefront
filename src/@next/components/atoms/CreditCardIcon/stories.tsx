import { storiesOf } from "@storybook/react";
import React from "react";

import { CreditCardIcon } from ".";

storiesOf("@components/atoms/CreditCardIcon", module)
  .add("VISA", () => <CreditCardIcon provider="visa" />)
  .add("MASTERCARD", () => <CreditCardIcon provider="mastercard" />)
  .add("DISCOVER", () => <CreditCardIcon provider="discover" />)
  .add("JCB", () => <CreditCardIcon provider="jcb" />)
  .add("MAESTRO", () => <CreditCardIcon provider="maestro" />)
  .add("AMEX", () => <CreditCardIcon provider="amex" />);
