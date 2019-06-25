import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { TopNavbar } from ".";

describe("<TopNavbar />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<TopNavbar />);

    expect(wrapper.exists()).toEqual(true);
  });
});
