import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

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

storiesOf("@components/molecules/ResetPasswordForm", module)
  .addParameters({ component: ResetPasswordForm })
  .add("default", () => (
    <IntlProvider locale="en">
      <ResetPasswordForm {...DEFAULT_PROPS} />
    </IntlProvider>
  ));
