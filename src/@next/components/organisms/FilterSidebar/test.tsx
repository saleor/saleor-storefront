import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { FilterSidebar } from ".";

describe("<FilterSidebar />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<FilterSidebar />);

    expect(wrapper.exists()).toEqual(true);
  });
});
