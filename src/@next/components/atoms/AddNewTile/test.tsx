import "jest-styled-components";

import { mount } from "enzyme";
import React from "react";

import { AddNewTile } from ".";

describe("<AddNewTile />", () => {
  it("should display child component with card type passed as prop and rendered inside it as a text", () => {
    const wrapper = mount(<AddNewTile type="card" />);

    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.text().toLowerCase()).toContain("add new card");
  });
});
