import { shallow } from "enzyme";
import React from "react";

import { CachedImage } from ".";

describe("<CachedImage />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<CachedImage />);

    expect(wrapper.exists()).toEqual(true);
  });
});
