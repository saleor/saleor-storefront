import "jest-styled-components";

import { shallow } from "enzyme";
import React from "react";

import { CartHeader } from ".";

describe("<CartHeader />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartHeader />);

    expect(wrapper.exists()).toEqual(true);
  });
});
