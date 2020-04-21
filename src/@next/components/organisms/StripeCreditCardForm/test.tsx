import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { StripeCreditCardForm } from ".";

describe("<StripeCreditCardForm />", () => {
  it("exists", () => {
    const wrapper = shallow(<StripeCreditCardForm />);

    expect(wrapper.exists()).toEqual(true);
  });
});
