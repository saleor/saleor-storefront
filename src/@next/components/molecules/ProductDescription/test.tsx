import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductDescription } from ".";

describe("<ProductDescription />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<ProductDescription />);

    expect(wrapper.exists()).toEqual(true);
  });
});
