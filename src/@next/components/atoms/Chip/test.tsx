import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Chip } from ".";

describe("<Chip />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<Chip />);

    expect(wrapper.exists()).toEqual(true);
  });
});
