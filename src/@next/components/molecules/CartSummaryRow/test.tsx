import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { CachedImage } from "..";

import { CartSummaryRow } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<CartSummaryRow />", () => {
  it("exists", () => {
    const wrapper = shallow(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display product name", () => {
    const wrapper = shallow(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(DEFAULT_PROPS.name);
  });

  it("should display product price", () => {
    const wrapper = mount(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(DEFAULT_PROPS.price.gross.amount);
  });

  it("should display product sku", () => {
    const wrapper = mount(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(DEFAULT_PROPS.sku);
  });

  it("should display product thumbnail", () => {
    const wrapper = shallow(<CartSummaryRow {...DEFAULT_PROPS} />);

    expect(wrapper.find(CachedImage).length).toEqual(1);
  });

  it("should display product quantity", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <CartSummaryRow {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain(`Quantity: ${DEFAULT_PROPS.quantity}`);
  });
});
