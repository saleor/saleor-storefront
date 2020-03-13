import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CartSummary } from ".";

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
  // Example test
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
});
