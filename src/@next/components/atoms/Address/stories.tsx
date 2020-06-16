import { storiesOf } from "@storybook/react";
import React from "react";

import { Address } from ".";

const DEFAULT_PROPS = {
  city: "Wroclaw",
  companyName: "Mirumee",
  country: {
    code: "PL",
    country: "Poland",
  },
  countryArea: "dolnyslask",
  firstName: "John",
  lastName: "Doe",
  phone: "555-5555",
  postalCode: "55-555",
  streetAddress1: "St Street",
  streetAddress2: "Second",
};
storiesOf("@components/atoms/Address", module)
  .addParameters({ component: Address })
  .add("default", () => <Address {...DEFAULT_PROPS} />);
