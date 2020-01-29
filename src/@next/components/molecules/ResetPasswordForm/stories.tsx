import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ResetPasswordForm } from ".";

const DEFAULT_PROPS = {
  errors: [],
  handleBlur: () => action("handleBlur"),
  handleChange: () => action("handleChange"),
  handleSubmit: () => action("handleSubmit"),
  passwordError: "",
  tokenError: false,
  values: {
    password: "",
    retypedPassword: "",
  },
};

storiesOf("@components/molecules/ResetPasswordForm", module).add(
  "default",
  () => <ResetPasswordForm {...DEFAULT_PROPS} />
);
