import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { SelectSidebar } from ".";
import { DEFAULT_PROPS } from "./testData";

const hide = jest.fn();
const onSelect = jest.fn();

describe("<SelectSidebar />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(
      <SelectSidebar
        title="PLEASE SELECT SIZE"
        {...DEFAULT_PROPS}
        hide={hide}
        onSelect={onSelect}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
