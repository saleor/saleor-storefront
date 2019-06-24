import { action } from "@storybook/addon-actions";
import React from "react";
import { CreditCardForm } from ".";

import { createStory } from "../baseStory";

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

createStory("CreditCardForm").add("default", () => (
  <CreditCardForm {...PROPS} />
));
