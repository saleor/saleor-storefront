import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { DropdownMenu } from ".";

describe("<DropdownMenu />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<DropdownMenu />);

    expect(wrapper.exists()).toEqual(true);
  });
});
