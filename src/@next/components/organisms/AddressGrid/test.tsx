import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressGrid } from ".";

const DEFAULT_PROPS = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: "Poland",
    countryArea: "dolnyslask",
    firstName: "John",
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: true,
  onEdit: jest.fn(),
  onRemove: jest.fn(),
  setDefault: jest.fn(),
};

describe("<AddressGrid />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AddressGrid addresses={[{ ...DEFAULT_PROPS }]} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
