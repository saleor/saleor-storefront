import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { SearchTextField } from ".";

describe("<SearchTextField />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<SearchTextField />);

    expect(wrapper.exists()).toEqual(true);
  });
});
