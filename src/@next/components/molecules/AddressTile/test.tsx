import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressTile } from ".";

describe("<AddressTile />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AddressTile />);

    expect(wrapper.exists()).toEqual(true);
  });
});
