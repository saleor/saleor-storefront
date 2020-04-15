import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartSummaryRow } from "@components/molecules";

import { CartSummary } from ".";
import { DEFAULT_PROPS } from "./fixtures";

const money = {
  gross: {
    amount: 123,
    currency: "PLN",
  },
  net: {
    amount: 100,
    currency: "PLN",
  },
};

describe("<CartSummary />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartSummary />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show subtotal price", () => {
    const wrapper = mount(<CartSummary subtotal={money} />);

    expect(wrapper.text()).toContain("123");
  });

  it("should show promo price", () => {
    const wrapper = mount(<CartSummary promoCode={money} />);

    expect(wrapper.text()).toContain("123");
  });

  it("should show shipping price", () => {
    const wrapper = mount(<CartSummary shipping={money} />);

    expect(wrapper.text()).toContain("123");
  });

  it("should show total price", () => {
    const wrapper = mount(<CartSummary total={money} />);

    expect(wrapper.text()).toContain("123");
  });

  it("should show correct number of product rows", () => {
    const wrapper = shallow(<CartSummary {...DEFAULT_PROPS} />);

    expect(wrapper.find(CartSummaryRow).length).toEqual(
      DEFAULT_PROPS.products.length
    );
  });
});
