import "jest-styled-components";

import { mount, shallow } from "enzyme";
import React from "react";

import { CartCostsSummary } from ".";
import { ALL_POSSIBLE_COSTS, BASIC_COSTS } from "./fixtures";

describe("<CartCostsSummary />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartCostsSummary {...BASIC_COSTS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display all costs", () => {
    const wrapper = mount(<CartCostsSummary {...ALL_POSSIBLE_COSTS} />);

    const cartSummaryCosts = wrapper.text();

    expect(cartSummaryCosts).toContain(
      ALL_POSSIBLE_COSTS.subtotalPrice?.gross.amount
    );
    expect(cartSummaryCosts).toContain(
      ALL_POSSIBLE_COSTS.totalPrice?.gross.amount
    );
    expect(cartSummaryCosts).toContain(
      ALL_POSSIBLE_COSTS.shippingPrice?.gross.amount
    );
    expect(cartSummaryCosts).toContain(
      ALL_POSSIBLE_COSTS.discountPrice?.gross.amount
    );
  });
});
