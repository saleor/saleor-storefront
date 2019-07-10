import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Address } from ".";

const DEFAULT_PROPS = {
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
};

describe("<Address />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<Address {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });
});
