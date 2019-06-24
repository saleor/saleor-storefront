import { action } from "@storybook/addon-actions";
import React from "react";
import { CreditCardForm } from ".";

import { createStory } from "../../molecules/baseStory";

const PROPS = {
  cardErrors: {},
  disabled: false,
  handleChange: action("onChange"),
  handleSubmit: action("onSubmit"),
  labelsText: {
    ccCsc: "CVC",
    ccExp: "Expiry Date",
    ccNumber: "Number",
  },
};

const PROPS_ERRORS = {
  ...PROPS,
  cardErrors: { number: { field: "number", message: "Wrong number" } },
};
createStory("CreditCardForm")
  .add("default", () => <CreditCardForm {...PROPS} />)
  .add("error", () => <CreditCardForm {...PROPS_ERRORS} />)
  .add("disabled", () => <CreditCardForm {...PROPS} disabled={true} />);
