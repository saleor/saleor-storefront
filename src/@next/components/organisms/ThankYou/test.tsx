import "jest-styled-components";

import { OrderStatus } from "@saleor/sdk/lib/gqlTypes/globalTypes";
import { mount, shallow } from "enzyme";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import React from "react";

import { ThankYou } from ".";
import { messages } from "./ThankYou";

describe("<ThankYou />", () => {
  const props = {
    orderStatus: OrderStatus.UNFULFILLED,
    orderNumber: "123",
    orderDetailsUrl: "/order/xyz",
    continueShoppingUrl: "/",
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
    const pushSpy = jest.fn().mockImplementation(() => new Promise(r => r()));
    const wrapper = mount(
      <RouterContext.Provider value={{ push: pushSpy } as any}>
        <ThankYou {...props} />
      </RouterContext.Provider>
    );

    wrapper.find("button").at(1).simulate("click");

    expect(pushSpy).toHaveBeenCalledWith("/order/xyz", "/order/xyz", {
      locale: undefined,
      scroll: true,
      shallow: undefined,
    });
  });

  it("should call continueShopping function when clicked", () => {
    const pushSpy = jest.fn().mockImplementation(() => new Promise(r => r()));
    const wrapper = mount(
      <RouterContext.Provider value={{ push: pushSpy } as any}>
        <ThankYou {...props} />
      </RouterContext.Provider>
    );

    wrapper.find("button").at(0).simulate("click");

    expect(pushSpy).toHaveBeenCalledWith("/", "/", {
      locale: undefined,
      scroll: true,
      shallow: undefined,
    });
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
