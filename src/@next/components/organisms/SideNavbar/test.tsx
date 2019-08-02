import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { SideNavbar } from ".";

const DEFAULT_PROPS = { onHide: jest.fn(), show: true, items: [] };

describe("<SideNavbar />", () => {
  it("exists", () => {
    const wrapper = shallow(<SideNavbar {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
