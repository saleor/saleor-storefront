import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { IntlProvider } from "react-intl";

import { AddressGridSelector } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<AddressGridSelector />", () => {
  it("exists", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressGridSelector {...DEFAULT_PROPS} onSelect={jest.fn()} />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("simulates select and submit events", done => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <IntlProvider locale="en">
        <AddressGridSelector {...DEFAULT_PROPS} onSelect={onSelect} />
      </IntlProvider>
    );

    const input = wrapper.find("input").at(0);
    const form = wrapper.find("form");
    const addressId = DEFAULT_PROPS.addresses[0].id;

    input.simulate("change", {
      target: { value: addressId },
    });
    form.simulate("submit");

    // delay checking the assertion since Formik handler within component is evaluated asynchronously
    window.setTimeout(() => {
      expect(onSelect).toHaveBeenCalledWith(
        DEFAULT_PROPS.addresses[0].address,
        addressId
      );
      done();
    }, 0);
  });
});
