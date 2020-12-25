import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductTileProjects } from ".";
import { PRODUCT } from "./fixtures";

describe("<ProductTile />", () => {
  it("exists", () => {
    const wrapper = shallow(<ProductTileProjects product={PRODUCT} />);

    expect(wrapper.exists()).toEqual(true);
  });
  it("has product name", () => {
    const wrapper = shallow(<ProductTileProjects product={PRODUCT} />);

    expect(wrapper.text()).toContain(PRODUCT.name);
  });
  it("has price displayed", () => {
    const wrapper = mount(<ProductTileProjects product={PRODUCT} />);

    expect(wrapper.text()).toContain(
      String(PRODUCT.pricing!.priceRange!.start!.gross!.amount)
    );
  });
});
