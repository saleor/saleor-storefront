import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { SideNavbar } from ".";

describe("<SideNavbar />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<SideNavbar />);

    expect(wrapper.exists()).toEqual(true);
  });
});
