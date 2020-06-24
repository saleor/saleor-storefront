import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { ResetPasswordForm } from ".";

describe("<ResetPasswordForm />", () => {
  const DEFAULT_PROPS = {
    errors: [],
    handleBlur: () => jest.fn(),
    handleChange: () => jest.fn(),
    handleSubmit: () => jest.fn(),
    passwordError: "",
    tokenError: false,
    values: {
      password: "",
      retypedPassword: "",
    },
  };
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <ResetPasswordForm {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
