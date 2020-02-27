import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Cart } from ".";

describe("<Cart />", () => {
  it("exists", () => {
    const wrapper = shallow(<Cart />);

    expect(wrapper.exists()).toEqual(true);
  });
});
