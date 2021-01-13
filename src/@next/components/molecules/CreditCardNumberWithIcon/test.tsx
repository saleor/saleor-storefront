import "jest-styled-components";

import { shallow } from "enzyme";
import React from "react";

import { CreditCardIcon } from "@components/atoms";

import { CreditCardNumberWithIcon } from "./CreditCardNumberWithIcon";

describe("<CreditCardNumberWithIcon />", () => {
  it("contains CreditCardIcon", () => {
    const wrapper = shallow(
      <CreditCardNumberWithIcon last4Digits={1234} creditCardProvider="visa" />
    );
    expect(wrapper.exists(CreditCardIcon)).toBe(true);
  });

  it("contains correct last 4 digits of Credit Card number", () => {
    const wrapper = shallow(
      <CreditCardNumberWithIcon last4Digits={9876} creditCardProvider="visa" />
    );

    expect(wrapper.text()).toContain("XXXX XXXX XXXX 9876");
  });
});
