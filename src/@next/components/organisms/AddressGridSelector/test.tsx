import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressGridSelector } from ".";

describe("<AddressGridSelector />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AddressGridSelector />);

    expect(wrapper.exists()).toEqual(true);
  });
});
