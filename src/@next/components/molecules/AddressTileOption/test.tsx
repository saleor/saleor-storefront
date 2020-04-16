import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressTileOption } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<AddressTileOption />", () => {
  it("renders address", () => {
    const wrapper = shallow(<AddressTileOption {...DEFAULT_PROPS} />);

    const wrapperText = wrapper.text();
    expect(wrapperText).toEqual(DEFAULT_PROPS.address.firstName);
    expect(wrapperText).toEqual(DEFAULT_PROPS.address.lastName);
    expect(wrapperText).toEqual(DEFAULT_PROPS.address.streetAddress1);
    expect(wrapperText).toEqual(DEFAULT_PROPS.address.country.country);
    expect(wrapperText).toEqual(DEFAULT_PROPS.address.postalCode);
  });

  it("renders label", () => {
    const text = "test";
    const wrapper = shallow(
      <AddressTileOption {...DEFAULT_PROPS} label={text} />
    );

    const wrapperText = wrapper.text();
    expect(wrapperText).toEqual(text);
  });

  it("simulates change events", () => {
    const onRadioChange = jest.fn();
    const wrapper = shallow(
      <AddressTileOption {...DEFAULT_PROPS} onChange={onRadioChange} />
    );

    wrapper.simulate("click");
    expect(onRadioChange).toHaveBeenCalledTimes(1);
  });
});
