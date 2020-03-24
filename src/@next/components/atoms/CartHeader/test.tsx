import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartHeader } from ".";

describe("<CartHeader />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<CartHeader />);

    expect(wrapper.exists()).toEqual(true);
  });
});
