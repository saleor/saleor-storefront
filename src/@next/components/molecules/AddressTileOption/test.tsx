import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressTileOption } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<AddressTileOption />", () => {
  it("renders address", () => {
    const wrapper = mount(<AddressTileOption {...DEFAULT_PROPS} />);

    const wrapperText = wrapper.text();
    expect(wrapperText.includes(DEFAULT_PROPS.address.firstName)).toBe(true);
    expect(wrapperText.includes(DEFAULT_PROPS.address.lastName)).toBe(true);
    expect(wrapperText.includes(DEFAULT_PROPS.address.streetAddress1)).toBe(
      true
    );
    expect(wrapperText.includes(DEFAULT_PROPS.address.country.country)).toBe(
      true
    );
    expect(wrapperText.includes(DEFAULT_PROPS.address.postalCode)).toBe(true);
  });

  it("simulates change events", () => {
    const onRadioChange = jest.fn();
    const wrapper = mount(
      <AddressTileOption {...DEFAULT_PROPS} onChange={onRadioChange} />
    );

    const input = wrapper.find("input").at(0);
    const addressId = DEFAULT_PROPS.id;

    input.simulate("change", {
      target: { value: addressId },
    });

    expect(onRadioChange).toHaveBeenCalledTimes(1);
  });
});
