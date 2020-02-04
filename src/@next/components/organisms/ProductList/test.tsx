import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductList } from ".";
import { PRODUCTS } from "./fixtures";

describe("<ProductList />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <ProductList
          products={PRODUCTS}
          canLoadMore={true}
          loading={false}
          onLoadMore={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });
  it("show loading", () => {
    const wrapper = mount(
      <BrowserRouter>
        <ProductList
          products={PRODUCTS}
          canLoadMore={true}
          loading={true}
          onLoadMore={jest.fn()}
        />
      </BrowserRouter>
    );

    expect(wrapper.text()).not.toContain("More +");
  });
  it("may load more", () => {
    const handleLoadMore = jest.fn();

    const wrapper = mount(
      <BrowserRouter>
        <ProductList
          products={PRODUCTS}
          canLoadMore={true}
          loading={false}
          onLoadMore={handleLoadMore}
        />
      </BrowserRouter>
    );

    expect(wrapper.text()).toContain("More +");

    wrapper.find("button").simulate("click");

    expect(handleLoadMore).toHaveBeenCalled();
  });
});
