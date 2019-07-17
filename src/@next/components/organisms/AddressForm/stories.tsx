import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressForm } from ".";

const NO_ERRORS = {
  firstName: null,
};
const PROPS = {
  errors: NO_ERRORS,
  handleSubmit: action("handleSubmit"),
};

const ERRORS = {
  errors: {
    firstName: {
      field: "firstName",
      message: "This is error",
    },
  },
};

storiesOf("@components/organisms/AddressForm", module)
  .add("default", () => <AddressForm {...PROPS} />)
  .add("with errors", () => <AddressForm {...PROPS} {...ERRORS} />);
