import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CreditCardIcon } from "@components/atoms";
import { CreditCardTile } from "./CreditCardTile";

describe("<CreditCardTile />", () => {
  const onRemoveMock = jest.fn();
  it("contains CreditCardIcon", () => {
    const wrapper = mount(
      <CreditCardTile
        nameOnCard="John Doe"
        expirationDate="10/2020"
        creditCardProvider="visa"
        last4Digits={1234}
        onRemove={onRemoveMock}
      />
    );
    expect(wrapper.exists(CreditCardIcon)).toBe(true);
  });

  it("contains correct data - owner name, expDate, last4Digits", () => {
    const wrapper = mount(
      <CreditCardTile
        nameOnCard="John Doe"
        expirationDate="10/2020"
        creditCardProvider="visa"
        last4Digits={9876}
        onRemove={onRemoveMock}
      />
    );

    expect(wrapper.text()).toContain("XXXX XXXX XXXX 9876");
    expect(wrapper.text()).toContain("John Doe");
    expect(wrapper.text()).toContain("10/2020");
  });
});
