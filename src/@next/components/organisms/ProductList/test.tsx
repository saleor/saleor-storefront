import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductList } from ".";
import { PRODUCTS } from "./fixtures";

describe("<ProductList />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <ProductList
        products={PRODUCTS}
        canLoadMore={true}
        loading={false}
        onLoadMore={() => null}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
