import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { OverlayItem } from ".";

describe("<OverlayItem />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<OverlayItem />);

    expect(wrapper.exists()).toEqual(true);
  });
});
