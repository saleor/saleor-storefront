import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressGrid } from ".";

describe("<AddressGrid />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AddressGrid />);

    expect(wrapper.exists()).toEqual(true);
  });
});
