import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductTileOther } from ".";
import { PRODUCT } from "./fixtures";

describe("<ProductTileOther />", () => {
  it("exists", () => {
    const wrapper = shallow(<ProductTileOther product={PRODUCT} />);

    expect(wrapper.exists()).toEqual(true);
  });
  it("has product name", () => {
    const wrapper = shallow(<ProductTileOther product={PRODUCT} />);

    expect(wrapper.text()).toContain(PRODUCT.name);
  });
  it("has price displayed", () => {
    const wrapper = mount(<ProductTileOther product={PRODUCT} />);

    expect(wrapper.text()).toContain(
      String(PRODUCT.pricing!.priceRange!.start!.gross!.amount)
    );
  });
});
