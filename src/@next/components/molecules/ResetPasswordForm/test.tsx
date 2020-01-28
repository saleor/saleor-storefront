import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

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
    const wrapper = shallow(<ResetPasswordForm {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
