import React from "react";

import { CreditCardTile } from ".";
import { createStory } from "../baseStory";

createStory("CreditCardTile").add("default", () => (
  <CreditCardTile nameOnCard="John Doe" expirationDate="05/2019" />
));
