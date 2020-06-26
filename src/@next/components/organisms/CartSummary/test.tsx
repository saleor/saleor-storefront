import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { CartSummaryRow } from "@components/molecules";

import { CartSummary } from ".";
import { DEFAULT_PROPS } from "./fixtures";

const money = {
  gross: {
    amount: 123,
    currency: "PLN",
  },
  net: {
    amount: 100,
    currency: "PLN",
  },
};

describe("<CartSummary />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartSummary />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show subtotal price", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartSummary subtotal={money} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("123");
  });

  it("should show promo price", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartSummary promoCode={money} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("123");
  });

  it("should show shipping price", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartSummary shipping={money} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("123");
  });

  it("should show total price", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartSummary total={money} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("123");
  });

  it("should show correct number of product rows", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartSummary {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.find(CartSummaryRow).length).toEqual(
      DEFAULT_PROPS.products.length
    );
  });
});
