import { storiesOf } from "@storybook/react";
import React from "react";

import { CreditCardIcon } from ".";

storiesOf("@components/atoms/CreditCardIcon", module)
  .addParameters({ component: CreditCardIcon })
  .add("VISA", () => <CreditCardIcon creditCardProvider="visa" />)
  .add("MASTERCARD", () => <CreditCardIcon creditCardProvider="mastercard" />)
  .add("DISCOVER", () => <CreditCardIcon creditCardProvider="discover" />)
  .add("JCB", () => <CreditCardIcon creditCardProvider="jcb" />)
  .add("MAESTRO", () => <CreditCardIcon creditCardProvider="maestro" />)
  .add("AMEX", () => <CreditCardIcon creditCardProvider="amex" />);
