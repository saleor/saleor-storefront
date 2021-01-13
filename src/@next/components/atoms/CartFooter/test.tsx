import "jest-styled-components";

import { mount, shallow } from "enzyme";
import React from "react";

import { CartFooter } from ".";
import { ALL_POSSIBLE_COSTS, BASIC_COSTS } from "./fixtures";

describe("<CartFooter />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartFooter {...BASIC_COSTS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display all costs", () => {
    const wrapper = mount(<CartFooter {...ALL_POSSIBLE_COSTS} />);

    const cartFooter = wrapper.text();

    expect(cartFooter).toContain(
      ALL_POSSIBLE_COSTS.subtotalPrice?.gross.amount
    );
    expect(cartFooter).toContain(ALL_POSSIBLE_COSTS.totalPrice?.gross.amount);
    expect(cartFooter).toContain(
      ALL_POSSIBLE_COSTS.shippingPrice?.gross.amount
    );
    expect(cartFooter).toContain(
      ALL_POSSIBLE_COSTS.discountPrice?.gross.amount
    );
  });
});
