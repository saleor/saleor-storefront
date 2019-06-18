import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { TextField } from ".";

describe("<TextField />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<TextField />);

    expect(wrapper.exists()).toEqual(true);
  });
});
