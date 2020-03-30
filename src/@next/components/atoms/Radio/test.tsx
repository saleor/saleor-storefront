import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Radio } from ".";

describe("<Radio />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<Radio />);

    expect(wrapper.exists()).toEqual(true);
  });
});
