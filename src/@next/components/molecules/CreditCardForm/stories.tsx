import { action } from "@storybook/addon-actions";
import React from "react";
// import { TextField } from "src/components";
import { CreditCardForm } from ".";

import { createStory } from "../baseStory";

// const CARD_ERRORS = {
//   cvv: "Error",
//   expirationMonth: "Expiration month is invalid",
//   expirationYear: "Expiration year is invalid",
//   number: "Wrong number",
// };

const CARD_VALUES = {
  ccCsc: null,
  ccExp: null,
  ccNumber: null,
};

const INPUT_PROPS = {
  customInput: () => <div />,
  disabled: false,
  onBlur: action("onBlur"),
  onChange: action("onChange"),
  onFocus: action("onFocus"),
};

const PROPS = {
  cardErrors: {},
  cardText: {
    ccCsc: "CVC",
    ccExp: "Expiry Date",
    ccNumber: "Number",
  },
  cardValues: CARD_VALUES,
  focusedInputName: null,
  formRef: null,
  handleSubmit: action("onSubmit"),
  inputProps: INPUT_PROPS,
};

createStory("CreditCardForm").add("default", () => (
  <CreditCardForm {...PROPS} />
));
