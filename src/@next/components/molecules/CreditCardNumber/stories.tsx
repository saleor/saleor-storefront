import React from "react";

import { CreditCardNumber } from ".";
import { createStory } from "../baseStory";

createStory("CreditCardNumber").add("default", () => (
  <CreditCardNumber provider="visa" last4Digits={1234} />
));
