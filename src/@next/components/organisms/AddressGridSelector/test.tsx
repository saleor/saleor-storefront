import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddressGridSelector } from ".";
import { DEFAULT_PROPS } from "./fixtures";

describe("<AddressGridSelector />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <AddressGridSelector {...DEFAULT_PROPS} onSelect={jest.fn()} />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("simulates select events", () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <AddressGridSelector {...DEFAULT_PROPS} onSelect={onSelect} />
    );

    const input = wrapper.find("input").at(0);
    const addressId = DEFAULT_PROPS.addresses[0].id;

    input.simulate("change", {
      target: { value: addressId },
    });
    expect(onSelect).toHaveBeenCalledWith(
      DEFAULT_PROPS.addresses[0].address,
      addressId
    );
  });
});
