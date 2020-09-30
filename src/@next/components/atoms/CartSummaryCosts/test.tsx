import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartSummaryCosts } from ".";
import { BASIC_COSTS, ALL_POSSIBLE_COSTS } from "./fixtures";

describe("<CartSummaryCosts />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartSummaryCosts {...BASIC_COSTS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display all costs", () => {
    const wrapper = shallow(<CartSummaryCosts {...ALL_POSSIBLE_COSTS} />);

    const cartSummaryCosts = wrapper.text();

    expect(cartSummaryCosts).toContain(ALL_POSSIBLE_COSTS.subtotalPrice);
    expect(cartSummaryCosts).toContain(ALL_POSSIBLE_COSTS.totalPrice);
    expect(cartSummaryCosts).toContain(ALL_POSSIBLE_COSTS.shippingPrice);
    expect(cartSummaryCosts).toContain(ALL_POSSIBLE_COSTS.discountPrice);
  });
});
