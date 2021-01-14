import "jest-styled-components";

import { mount } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";

import { DiscountForm } from ".";

describe("<DiscountForm />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <DiscountForm />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
