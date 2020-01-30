import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddToWishlist } from ".";

describe("<AddToWishlist />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AddToWishlist />);

    expect(wrapper.exists()).toEqual(true);
  });
});
