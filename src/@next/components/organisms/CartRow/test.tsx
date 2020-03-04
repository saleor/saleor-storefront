import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartRow } from ".";

describe("<CartRow />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<CartRow />);

    expect(wrapper.exists()).toEqual(true);
  });
});
