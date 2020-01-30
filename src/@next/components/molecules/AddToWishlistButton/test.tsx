import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddToWishlistButton } from ".";

describe("<AddToWishlistButton />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddToWishlistButton />);

    expect(wrapper.exists()).toEqual(true);
  });
});
