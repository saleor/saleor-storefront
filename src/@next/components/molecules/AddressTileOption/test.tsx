import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressTileOption } from ".";

describe("<AddressTileOption />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AddressTileOption />);

    expect(wrapper.exists()).toEqual(true);
  });
});
