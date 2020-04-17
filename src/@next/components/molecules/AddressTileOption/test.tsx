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

  it("renders label", () => {
    const text = "test";
    const wrapper = mount(
      <AddressTileOption {...DEFAULT_PROPS} label={text} />
    );

    const wrapperText = wrapper.text();
    expect(wrapperText.includes(text)).toBe(true);
  });

  it("simulates change events", () => {
    const onRadioChange = jest.fn();
    const wrapper = mount(
      <AddressTileOption {...DEFAULT_PROPS} onChange={onRadioChange} />
    );

    wrapper.simulate("click");
    expect(onRadioChange).toHaveBeenCalledTimes(1);
  });
});
