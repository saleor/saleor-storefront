import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Wishlist } from ".";
import { WISHLIST } from "./fixtures";

describe("<Wishlist />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <Wishlist wishlist={WISHLIST} />
      </BrowserRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
