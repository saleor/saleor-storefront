import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { DebouncedTextField } from ".";

describe("<DebouncedTextField />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<DebouncedTextField />);

    expect(wrapper.exists()).toEqual(true);
  });
});
