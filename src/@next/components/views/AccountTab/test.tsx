import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AccountTab } from ".";

describe("<AccountTab />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AccountTab />);

    expect(wrapper.exists()).toEqual(true);
  });
});
