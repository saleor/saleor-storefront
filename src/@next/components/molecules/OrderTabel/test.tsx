import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { OrderTabel } from ".";

describe("<OrderTabel />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<OrderTabel />);

    expect(wrapper.exists()).toEqual(true);
  });
});
