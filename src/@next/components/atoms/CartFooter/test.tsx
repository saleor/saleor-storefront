import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartFooter } from ".";
import { BASIC_COSTS, ALL_POSSIBLE_COSTS } from "./fixtures";

describe("<CartFooter />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartFooter {...BASIC_COSTS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display all costs", () => {
    const wrapper = shallow(<CartFooter {...ALL_POSSIBLE_COSTS} />);

    const cartFooter = wrapper.text();

    expect(cartFooter).toContain(ALL_POSSIBLE_COSTS.subtotalPrice);
    expect(cartFooter).toContain(ALL_POSSIBLE_COSTS.totalPrice);
    expect(cartFooter).toContain(ALL_POSSIBLE_COSTS.shippingPrice);
    expect(cartFooter).toContain(ALL_POSSIBLE_COSTS.discountPrice);
  });
});
