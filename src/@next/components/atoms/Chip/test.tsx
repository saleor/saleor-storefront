import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Chip } from ".";

describe("<Chip />", () => {
  it("exists", () => {
    const wrapper = shallow(<Chip />);

    expect(wrapper.exists()).toEqual(true);
  });
});
