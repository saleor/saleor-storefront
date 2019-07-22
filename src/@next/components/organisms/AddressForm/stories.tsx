import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressForm } from ".";

const NO_ERRORS = {};
const PROPS = {
  errors: NO_ERRORS,
  handleSubmit: action("handleSubmit"),
};

const ERRORS = {
  errors: {
    firstName: [
      {
        field: "firstName",
        message: "This is error",
      },
    ],
    lastName: [
      {
        field: "lastName",
        message: "This is error",
      },
    ],
  },
};

const INITIAL_DATA = {
  address: {
    city: "New York",
    companyName: "Mirumee",
    country: "US",
    countryArea: "NY",
    firstName: "John",
    lastName: "Doe",
    phone: "555-55555",
    postalCode: "90210",
    streetAddress1: "Street line 1",
    streetAddress2: "Street line 2",
  },
};

storiesOf("@components/organisms/AddressForm", module)
  .add("default", () => <AddressForm {...PROPS} />)
  .add("with errors", () => <AddressForm {...PROPS} {...ERRORS} />)
  .add("with partial data", () => <AddressForm {...PROPS} {...INITIAL_DATA} />);
