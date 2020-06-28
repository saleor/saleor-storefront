import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { CreditCardForm } from ".";

const ERRORS = {
  cvv: null,
  expirationMonth: null,
  expirationYear: null,
  number: null,
};

const PROPS = {
  cardErrors: ERRORS,
  disabled: false,
  handleSubmit: action("onSubmit"),
  labelsText: {
    ccCsc: "CVC",
    ccExp: "Expiry Date",
    ccNumber: "Number",
  },
};

const PROPS_ERRORS = {
  ...PROPS,
  cardErrors: {
    ...ERRORS,
    number: { field: "number", message: "Wrong number" },
  },
};

storiesOf(`@components/organisms/CreditCardForm`, module)
  .add("default", () => <CreditCardForm {...PROPS} />)
  .add("error", () => <CreditCardForm {...PROPS_ERRORS} />)
  .add("disabled", () => <CreditCardForm {...PROPS} disabled />);
