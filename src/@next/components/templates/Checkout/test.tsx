import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Checkout } from ".";

describe("<Checkout />", () => {
  it("exists", () => {
    const wrapper = shallow(<Checkout />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show passed navigation", () => {
    const navigation = "navigation";
    const wrapper = shallow(<Checkout navigation="navigation" />);

    expect(wrapper.text()).toContain(navigation);
  });

  it("should show passed checkout", () => {
    const checkout = "checkout";
    const wrapper = shallow(<Checkout checkout="checkout" />);

    expect(wrapper.text()).toContain(checkout);
  });

  it("should show passed cartSummary", () => {
    const cartSummary = "cartSummary";
    const wrapper = shallow(<Checkout cartSummary="cartSummary" />);

    expect(wrapper.text()).toContain(cartSummary);
  });

  it("should show passed button", () => {
    const button = "button";
    const wrapper = shallow(<Checkout button="button" />);

    expect(wrapper.text()).toContain(button);
  });
});
