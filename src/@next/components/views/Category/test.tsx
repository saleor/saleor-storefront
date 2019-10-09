import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Category } from ".";

describe("<Category />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<Category />);

    expect(wrapper.exists()).toEqual(true);
  });
});
