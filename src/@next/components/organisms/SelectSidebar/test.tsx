import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { SelectSidebar } from ".";
import { DEFAULT_PROPS } from "./testData";

const hide = jest.fn();
const onSelect = jest.fn();

describe("<SelectSidebar />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <SelectSidebar
        title="PLEASE SELECT SIZE"
        {...DEFAULT_PROPS}
        show
        hide={hide}
        onSelect={onSelect}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("should render values", () => {
    const wrapper = shallow(
      <SelectSidebar
        title="PLEASE SELECT SIZE"
        {...DEFAULT_PROPS}
        show
        hide={hide}
        onSelect={onSelect}
      />
    );

    DEFAULT_PROPS.options.every(({ label }) =>
      expect(wrapper.contains(label)).toBe(true)
    );
  });
});
