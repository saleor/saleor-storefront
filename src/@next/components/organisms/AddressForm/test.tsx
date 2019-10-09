import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Input } from "@components/atoms";

import { AddressForm } from ".";

const PROPS = {
  errors: [],
  handleSubmit: jest.fn(),
  options: [
    { code: "PL", country: "Poland" },
    { code: "PT", country: "Portugal" },
    { code: "US", country: "United States of America" },
    { code: "DE", country: "Germany" },
    { code: "BE", country: "Belarus" },
    { code: "SE", country: "Sweden" },
    { code: "FR", country: "France" },
    { code: "CZ", country: "Czech Republic" },
    { code: "FI", country: "Finland" },
    { code: "GB", country: "Great Britain" },
  ],
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
  address: {
    city: "New York",
    companyName: "Mirumee",
    country: {
      code: "US",
      country: "United States of America",
    },
    countryArea: "NY",
    firstName: "John",
    lastName: "Doe",
    phone: "555-55555",
    postalCode: "90210",
    streetAddress1: "Street line 1",
    streetAddress2: "Street line 2",
  },
};

describe("<AddressForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddressForm {...PROPS} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain error provided as prop", () => {
    const wrapper = mount(<AddressForm {...PROPS} {...ERRORS} />);

    expect(wrapper.text()).toContain(errorMessage);
  });

  it("should contain partial data if provided", () => {
    const wrapper = mount(<AddressForm {...PROPS} {...INITIAL_DATA} />);

    const getValue = (n: number) =>
      wrapper
        .find(Input)
        .at(n)
        .prop("value");
    expect(getValue(0)).toEqual(INITIAL_DATA.address.firstName);
    expect(getValue(1)).toEqual(INITIAL_DATA.address.lastName);
    expect(getValue(2)).toEqual(INITIAL_DATA.address.companyName);
    expect(getValue(3)).toEqual(INITIAL_DATA.address.phone);
    expect(getValue(4)).toEqual(INITIAL_DATA.address.streetAddress1);
    expect(getValue(5)).toEqual(INITIAL_DATA.address.streetAddress2);
    expect(getValue(6)).toEqual(INITIAL_DATA.address.city);
    expect(getValue(7)).toEqual(INITIAL_DATA.address.postalCode);
    expect(wrapper.text()).toContain(INITIAL_DATA.address.country.country);
    expect(getValue(8)).toEqual(INITIAL_DATA.address.countryArea);
  });
});
