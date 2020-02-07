import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Wishlist } from ".";
import { WISHLIST } from "./fixtures";

describe("<Wishlist />", () => {
  it("exists", () => {
    const wrapper = shallow(<Wishlist wishlist={WISHLIST} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
