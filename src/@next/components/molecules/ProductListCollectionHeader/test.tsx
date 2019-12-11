import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ProductListCollectionHeader } from ".";

const clearFilterMock = jest.fn();
const onChangeMock = jest.fn();
const openFiltersMenuMock = jest.fn();

const DEFAULT_PROPS = {
  activeFilters: 0,
  clearFilters: clearFilterMock,
  numberOfProducts: 255,
  onChange: onChangeMock,
  openFiltersMenu: openFiltersMenuMock,
  sortOptions: [
    {
      label: "Price ASC",
      value: "PRICE",
    },
    {
      label: "Price DESC",
      value: "-PRICE",
    },
  ],
};

describe("<ProductListCollectionHeader />", () => {
  // Example test
  it("exists", () => {
    const wrapper = shallow(<ProductListCollectionHeader {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display number of products found", () => {
    const wrapper = shallow(<ProductListCollectionHeader {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(String(DEFAULT_PROPS.numberOfProducts));
  });

  it("should not display Clear Filters button if no active filters present", () => {
    const wrapper = shallow(<ProductListCollectionHeader {...DEFAULT_PROPS} />);

    expect(wrapper.text()).not.toContain("Clear Filters");
  });

  it("should display Clear Filters button if active filters present are present", () => {
    const wrapper = shallow(
      <ProductListCollectionHeader {...DEFAULT_PROPS} activeFilters={3} />
    );

    expect(wrapper.text()).toContain("CLEAR FILTERS");
  });

  it("should display number of active filters if any are present", () => {
    const wrapper = shallow(
      <ProductListCollectionHeader {...DEFAULT_PROPS} activeFilters={3} />
    );

    expect(wrapper.text()).toContain("FILTERS (3)");
  });

  it("should call method for clearing filters when clicking on Clear Filters button", () => {
    const wrapper = mount(
      <ProductListCollectionHeader {...DEFAULT_PROPS} activeFilters={3} />
    );

    wrapper
      .find("button")
      .filterWhere(item => {
        return item.prop("children") === "CLEAR FILTERS";
      })
      .simulate("click");

    expect(clearFilterMock).toHaveBeenCalledTimes(1);
  });

  it("should call method for clearing filters when clicking on Clear Filters button", () => {
    const wrapper = mount(
      <ProductListCollectionHeader {...DEFAULT_PROPS} activeFilters={3} />
    );

    wrapper
      .find("button")
      .at(0)
      .simulate("click");

    expect(openFiltersMenuMock).toHaveBeenCalledTimes(1);
  });
});
