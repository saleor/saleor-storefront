import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Address } from ".";

describe("<Address />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<Address />);

    expect(wrapper.exists()).toEqual(true);
  });
});
