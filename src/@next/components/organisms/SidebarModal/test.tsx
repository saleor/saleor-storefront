import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { SidebarModal } from ".";

describe("<SidebarModal />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<SidebarModal />);

    expect(wrapper.exists()).toEqual(true);
  });
});
