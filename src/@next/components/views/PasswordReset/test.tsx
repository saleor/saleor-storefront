import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { PasswordReset } from ".";

describe("<PasswordReset />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<PasswordReset />);

    expect(wrapper.exists()).toEqual(true);
  });
});
