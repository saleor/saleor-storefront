import "jest-styled-components";

import { mount } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";

import { Icon } from "@components/atoms";

import { CartRow } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CartRow />", () => {
  it("exists", () => {
    const onRemoveMock = jest.fn();
    const onQuantityChangeMock = jest.fn();
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartRow
          {...DEFAULT_PROPS}
          onRemove={onRemoveMock}
          onQuantityChange={onQuantityChangeMock}
        />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should call mock when clicking on trash icon", () => {
    const onRemoveMock = jest.fn();
    const onQuantityChangeMock = jest.fn();
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartRow
          {...DEFAULT_PROPS}
          onRemove={onRemoveMock}
          onQuantityChange={onQuantityChangeMock}
        />
      </IntlProvider>
    );
    wrapper
      .find(Icon)
      .findWhere(wrapper => wrapper.props().name === "trash")
      .simulate("click");

    expect(onRemoveMock).toHaveBeenCalled();
  });

  it("should call mock when clicking on subtract quantity icon", () => {
    const onRemoveMock = jest.fn();
    const onQuantityChangeMock = jest.fn();
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartRow
          {...DEFAULT_PROPS}
          onRemove={onRemoveMock}
          onQuantityChange={onQuantityChangeMock}
        />
      </IntlProvider>
    );

    wrapper
      .find(Icon)
      .findWhere(wrapper => wrapper.props().name === "horizontal_line")
      .simulate("click");

    expect(onQuantityChangeMock).toHaveBeenCalledWith(
      DEFAULT_PROPS.quantity - 1
    );
  });

  it("should call mock when clicking on add more quantity icon", () => {
    const onRemoveMock = jest.fn();
    const onQuantityChangeMock = jest.fn();
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartRow
          {...DEFAULT_PROPS}
          onRemove={onRemoveMock}
          onQuantityChange={onQuantityChangeMock}
        />
      </IntlProvider>
    );

    wrapper
      .find(Icon)
      .findWhere(wrapper => wrapper.props().name === "plus")
      .simulate("click");

    expect(onQuantityChangeMock).toHaveBeenCalledWith(
      DEFAULT_PROPS.quantity + 1
    );
  });

  it("should not call mock when clicking on add more quantity icon and max quantity is reached", () => {
    const onRemoveMock = jest.fn();
    const onQuantityChangeMock = jest.fn();
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartRow
          {...DEFAULT_PROPS}
          maxQuantity={3}
          quantity={3}
          onRemove={onRemoveMock}
          onQuantityChange={onQuantityChangeMock}
        />
      </IntlProvider>
    );

    wrapper
      .find(Icon)
      .findWhere(wrapper => wrapper.props().name === "plus")
      .simulate("click");

    expect(onQuantityChangeMock).toHaveBeenCalledTimes(0);
  });
});
