import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressForm } from ".";

const PROPS = {
  handleSubmit: action("onSubmit"),
};

const PROPS_WITH_ADDRESS = {
  ...PROPS,
  address: {
    city: "New York",
    firstName: "John",
    lastName: "Doe",
  },
};

storiesOf("@components/organisms/AddressForm", module)
  .add("default", () => <AddressForm {...PROPS} />)
  .add("with partial address", () => <AddressForm {...PROPS_WITH_ADDRESS} />);
