import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductListContainer } from ".";

describe("<ProductListContainer />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<ProductListContainer />);

    expect(wrapper.exists()).toEqual(true);
  });
});
