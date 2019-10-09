import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { FilterAttribute } from ".";

describe("<FilterAttribute />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<FilterAttribute />);

    expect(wrapper.exists()).toEqual(true);
  });
});
