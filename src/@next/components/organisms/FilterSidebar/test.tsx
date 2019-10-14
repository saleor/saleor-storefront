import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { FilterSidebar } from ".";
import { DEFAULT_PROPS } from "./testData";

const hide = jest.fn();
const onAttributeFiltersChange = jest.fn();
describe("<FilterSidebar />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <FilterSidebar
        {...DEFAULT_PROPS}
        hide={hide}
        onAttributeFiltersChange={onAttributeFiltersChange}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
