import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AccountTile } from ".";

describe("<AccountTile />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AccountTile />);

    expect(wrapper.exists()).toEqual(true);
  });
});
