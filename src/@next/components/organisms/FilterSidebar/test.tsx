import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { FilterSidebar } from ".";
import { DEFAULT_PROPS } from "./testData";

const hide = jest.fn();
const onAttributeValueClick = jest.fn();

describe("<FilterSidebar />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <FilterSidebar
        {...DEFAULT_PROPS}
        hide={hide}
        onAttributeValueClick={onAttributeValueClick}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
