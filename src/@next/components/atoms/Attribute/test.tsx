import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Attribute } from ".";

describe("<Attribute />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<Attribute />);

    expect(wrapper.exists()).toEqual(true);
  });
});
