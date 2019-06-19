import React from "react";

import { CreditCardTile } from ".";
import { createStory } from "../baseStory";

const emptyFunction = () => {
  // tslint:disable-next-line:no-console
  console.log("");
};
createStory("CreditCardTile").add("default", () => (
  <CreditCardTile
    nameOnCard="John Doe"
    expirationDate="05/2019"
    last4Digits={9876}
    provider="visa"
    onEdit={emptyFunction}
    onRemove={emptyFunction}
  />
));
