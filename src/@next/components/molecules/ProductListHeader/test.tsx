import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductListHeader } from ".";

describe("<ProductListHeader />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<ProductListHeader />);

    expect(wrapper.exists()).toEqual(true);
  });
});
