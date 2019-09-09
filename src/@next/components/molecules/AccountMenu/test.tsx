import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AccountMenu } from ".";

describe("<AccountMenu />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AccountMenu />);

    expect(wrapper.exists()).toEqual(true);
  });
});
