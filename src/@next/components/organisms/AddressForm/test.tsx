import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { Input, Select } from "@components/atoms";

import { AddressForm } from ".";
import { address, countries } from "./fixtures";

const PROPS = {
  countriesOptions: countries,
  errors: [],
  handleSubmit: jest.fn(),
};

const errorMessage = "This is an error";
const ERRORS = {
  errors: [
    {
      field: "firstName",
      message: errorMessage,
    },
  ],
};

const INITIAL_DATA = {
  address,
};

describe("<AddressForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddressForm {...PROPS} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain error provided as prop", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressForm {...PROPS} {...ERRORS} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain(errorMessage);
  });

  it("should contain partial data if provided", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressForm {...PROPS} {...INITIAL_DATA} />
      </IntlProvider>
    );

    const getValue = (n: number) => wrapper.find(Input).at(n).prop("value");
    expect(getValue(0)).toEqual(INITIAL_DATA.address.firstName);
    expect(getValue(1)).toEqual(INITIAL_DATA.address.lastName);
    expect(getValue(2)).toEqual(INITIAL_DATA.address.companyName);
    expect(getValue(3)).toEqual(INITIAL_DATA.address.phone);
    expect(getValue(4)).toEqual(INITIAL_DATA.address.streetAddress1);
    expect(getValue(5)).toEqual(INITIAL_DATA.address.streetAddress2);
    expect(getValue(6)).toEqual(INITIAL_DATA.address.city);
    expect(getValue(7)).toEqual(INITIAL_DATA.address.postalCode);
    expect(wrapper.find(Select).at(0).prop("value")).toEqual(
      INITIAL_DATA.address.country
    );
    expect(getValue(8)).toEqual(INITIAL_DATA.address.countryArea);
  });
});
