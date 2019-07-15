import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressForm } from ".";

describe("<AddressForm />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<AddressForm />);

    expect(wrapper.exists()).toEqual(true);
  });
});
