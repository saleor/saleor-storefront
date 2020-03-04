import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Cart } from ".";

describe("<Cart />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <Cart items={[]} updateItem={jest.fn()} loading={false} error={null} />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
