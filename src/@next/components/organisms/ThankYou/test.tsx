import { OrderStatus } from "@saleor/sdk/lib/gqlTypes/globalTypes";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ThankYou } from ".";
import { messages } from "./ThankYou";

describe("<ThankYou />", () => {
  const props = {
    orderStatus: OrderStatus.UNFULFILLED,
    orderNumber: "123",
    orderDetails: jest.fn(),
    continueShopping: jest.fn(),
  };

  it("exists", () => {
    const wrapper = shallow(<ThankYou {...props} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain order number", () => {
    const wrapper = shallow(<ThankYou {...props} />);

    expect(wrapper.text()).toContain(props.orderNumber);
  });

  it("should call orderDetails function when clicked", () => {
    const wrapper = mount(<ThankYou {...props} />);

    wrapper.find("button").at(1).simulate("click");

    expect(props.orderDetails).toHaveBeenCalled();
  });

  it("should call continueShopping function when clicked", () => {
    const wrapper = mount(<ThankYou {...props} />);

    wrapper.find("button").at(0).simulate("click");

    expect(props.continueShopping).toHaveBeenCalled();
  });

  it("should display proper subtitle when order status is UNCONFIRMED", () => {
    const wrapper = mount(
      <ThankYou {...props} orderStatus={OrderStatus.UNCONFIRMED} />
    );

    expect(wrapper.text()).toContain(messages.unconfirmed.defaultMessage);
  });

  it("should display proper subtitle when order status is UNFULFILLED", () => {
    const wrapper = mount(<ThankYou {...props} />);

    expect(wrapper.text()).toContain(messages.unfulfilled.defaultMessage);
  });
});
