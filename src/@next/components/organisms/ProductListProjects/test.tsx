import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ProductListProjects } from ".";
import { PRODUCTS } from "./fixtures";

describe("<ProductListProjects />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <ProductListProjects
          products={PRODUCTS}
          canLoadMore
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
        <ProductListProjects
          products={PRODUCTS}
          canLoadMore
          loading
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
        <ProductListProjects
          products={PRODUCTS}
          canLoadMore
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
