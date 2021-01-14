import "jest-styled-components";

import { mount, shallow } from "enzyme";
import React from "react";

import { ProductList } from ".";
import { PRODUCTS } from "./fixtures";

describe("<ProductList />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <ProductList
        products={PRODUCTS}
        canLoadMore
        loading={false}
        onLoadMore={jest.fn()}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
  it("show loading", () => {
    const wrapper = mount(
      <ProductList
        products={PRODUCTS}
        canLoadMore
        loading
        onLoadMore={jest.fn()}
      />
    );

    expect(wrapper.text()).not.toContain("More +");
  });
  it("may load more", () => {
    const handleLoadMore = jest.fn();

    const wrapper = mount(
      <ProductList
        products={PRODUCTS}
        canLoadMore
        loading={false}
        onLoadMore={handleLoadMore}
      />
    );

    expect(wrapper.text()).toContain("More +");

    wrapper.find("button").simulate("click");

    expect(handleLoadMore).toHaveBeenCalled();
  });
});
