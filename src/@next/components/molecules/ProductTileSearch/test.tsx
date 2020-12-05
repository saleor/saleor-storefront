import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductTileSearch } from ".";
import { PRODUCT } from "./fixtures";

describe("<ProductTileSearch />", () => {
  it("exists", () => {
    const wrapper = shallow(<ProductTileSearch product={PRODUCT} />);

    expect(wrapper.exists()).toEqual(true);
  });
  it("has product name", () => {
    const wrapper = shallow(<ProductTileSearch product={PRODUCT} />);

    expect(wrapper.text()).toContain(PRODUCT.name);
  });
  it("has price displayed", () => {
    const wrapper = mount(<ProductTileSearch product={PRODUCT} />);

    expect(wrapper.text()).toContain(
      String(PRODUCT.pricing!.priceRange!.start!.gross!.amount)
    );
  });
});
