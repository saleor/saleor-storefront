import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Address } from ".";

const DEFAULT_PROPS = {
  city: "Wroclaw",
  companyName: "Mirumee",
  country: {
    code: "PL",
    country: "Poland",
  },
  countryArea: "dolnyslask",
  firstName: "John",
  lastName: "Doe",
  phone: "555-5555",
  postalCode: "55-555",
  streetAddress1: "St Street",
  streetAddress2: "Second",
};

describe("<Address />", () => {
  it("exists", () => {
    const wrapper = shallow(<Address {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("contains provided data", () => {
    const wrapper = shallow(<Address {...DEFAULT_PROPS} />);
    const keys = Object.keys(DEFAULT_PROPS);

    keys.map(value => {
      if (value !== "country") {
        expect(wrapper.text()).toContain((DEFAULT_PROPS as any)[value]);
      }
    });
    expect(wrapper.text()).toContain(DEFAULT_PROPS.country.country);
  });
});
