import "jest-styled-components";

import { shallow } from "enzyme";
import React from "react";

import { NavLink } from ".";
import { mockItemRoute } from "./fixtures";

describe("<NavLink />", () => {
  it("exists", () => {
    const wrapper = shallow(<NavLink item={mockItemRoute} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
