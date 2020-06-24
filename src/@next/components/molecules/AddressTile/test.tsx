import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { IconButton } from "@components/atoms";
import { AddressTile } from ".";

const onEdit = jest.fn();
const onRemove = jest.fn();
const setDefault = jest.fn();

const DEFAULT_PROPS = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: {
      code: "PL",
      country: "Poland",
    },
    countryArea: "dolnyslask",
    firstName: "John",
    isDefaultBillingAddress: true,
    isDefaultShippingAddress: true,
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  onEdit,
  onRemove,
  setDefault,
};

describe("<AddressTile />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressTile {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should run onRemove function for clicking on trash button", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressTile {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    wrapper.find(IconButton).last().simulate("click");

    expect(onRemove).toHaveBeenCalled();
  });

  it("should run onEdit function for clicking on edit button", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressTile {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    wrapper.find(IconButton).at(1).simulate("click");

    expect(onEdit).toHaveBeenCalled();
  });

  it("should run setDefault method for clicking on Set default billing address", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressTile {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    wrapper.find(IconButton).first().simulate("click");
    wrapper.find("li").first().simulate("click");

    expect(setDefault).toHaveBeenCalledWith("BILLING");
  });

  it("should run setDefault method for clicking on Set default shipping address", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressTile {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    wrapper.find(IconButton).first().simulate("click");
    wrapper.find("li").last().simulate("click");

    expect(setDefault).toHaveBeenCalledWith("SHIPPING");
  });

  it("should present Default address if address is default shipping and billing", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressTile {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("Default Address");
  });

  it("should present Default Shipping Address if address is set as default shipping and is different from default billing address", () => {
    const CUSTOM_PROPS = { ...DEFAULT_PROPS };
    CUSTOM_PROPS.address.isDefaultBillingAddress = false;
    CUSTOM_PROPS.address.isDefaultShippingAddress = true;

    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressTile {...CUSTOM_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("Default Shipping Address");
  });

  it("should present Default Billing Address if address is set as default billing and is different from default shipping address", () => {
    const CUSTOM_PROPS = { ...DEFAULT_PROPS };
    CUSTOM_PROPS.address.isDefaultBillingAddress = true;
    CUSTOM_PROPS.address.isDefaultShippingAddress = false;

    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressTile {...CUSTOM_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("Default Billing Address");
  });
});
