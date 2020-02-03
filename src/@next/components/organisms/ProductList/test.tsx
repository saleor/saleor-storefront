import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductList } from ".";
import { PRODUCTS } from "./fixtures";

describe("<ProductList />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <ProductList products={PRODUCTS} totalCount={PRODUCTS.length} />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
