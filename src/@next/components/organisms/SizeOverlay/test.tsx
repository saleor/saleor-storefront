import { shallow } from "enzyme";
import React from "react";

import { SizeOverlay } from ".";

describe("<SizeOverlay />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<SizeOverlay />);

    expect(wrapper.exists()).toEqual(true);
  });
});
