import { shallow } from "enzyme";
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
    const wrapper = shallow(
      <AddressGridSelector {...DEFAULT_PROPS} onSelect={onSelect} />
    );

    wrapper.simulate("click");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
