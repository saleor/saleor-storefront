import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ThankYou } from ".";

describe("<ThankYou />", () => {
  const orderNumber = "123";
  const orderDetailsMock = jest.fn();
  const continueShoppingMock = jest.fn();

  it("exists", () => {
    const wrapper = shallow(
      <ThankYou
        orderNumber={orderNumber}
        orderDetails={orderDetailsMock}
        continueShopping={continueShoppingMock}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain order number", () => {
    const wrapper = shallow(
      <ThankYou
        orderNumber={orderNumber}
        orderDetails={orderDetailsMock}
        continueShopping={continueShoppingMock}
      />
    );

    expect(wrapper.text()).toContain(orderNumber);
  });

  it("should call orderDetails function when clicked", () => {
    const wrapper = mount(
      <ThankYou
        orderNumber={orderNumber}
        orderDetails={orderDetailsMock}
        continueShopping={continueShoppingMock}
      />
    );

    wrapper.find("button").at(1).simulate("click");

    expect(orderDetailsMock).toHaveBeenCalled();
  });

  it("should call continueShopping function when clicked", () => {
    const wrapper = mount(
      <ThankYou
        orderNumber={orderNumber}
        orderDetails={orderDetailsMock}
        continueShopping={continueShoppingMock}
      />
    );

    wrapper.find("button").at(0).simulate("click");

    expect(continueShoppingMock).toHaveBeenCalled();
  });
});
