import "jest-styled-components";

import { mount, shallow } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";

import { ProductListHeader } from ".";

const clearFilterMock = jest.fn();
const onChangeMock = jest.fn();
const onCloseFilterAttributeMock = jest.fn();
const openFiltersMenuMock = jest.fn();

const DEFAULT_PROPS = {
  activeFilters: 0,
  activeFiltersAttributes: [],
  clearFilters: clearFilterMock,
  numberOfProducts: 255,
  onChange: onChangeMock,
  onCloseFilterAttribute: onCloseFilterAttributeMock,
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

describe("<ProductListHeader />", () => {
  it("exists", () => {
    const wrapper = shallow(<ProductListHeader {...DEFAULT_PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should display number of products found", () => {
    const wrapper = shallow(<ProductListHeader {...DEFAULT_PROPS} />);

    expect(wrapper.text()).toContain(String(DEFAULT_PROPS.numberOfProducts));
  });

  it("should not display Clear Filters button if no active filters present", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <ProductListHeader {...DEFAULT_PROPS} />
      </IntlProvider>
    );

    expect(wrapper.text()).not.toContain("Clear Filters");
  });

  it("should display Clear Filters button if active filters present are present", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <ProductListHeader {...DEFAULT_PROPS} activeFilters={3} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("CLEAR FILTERS");
  });

  it("should display number of active filters if any are present", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <ProductListHeader {...DEFAULT_PROPS} activeFilters={3} />
      </IntlProvider>
    );

    expect(wrapper.text()).toContain("FILTERS (3)");
  });

  it("should call method for clearing filters when clicking on Clear Filters button", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <ProductListHeader {...DEFAULT_PROPS} activeFilters={3} />
      </IntlProvider>
    );

    wrapper
      .find("button")
      .filterWhere(item => {
        return item.text() === "CLEAR FILTERS";
      })
      .simulate("click");

    expect(clearFilterMock).toHaveBeenCalledTimes(1);
  });

  it("should call method for clearing filters when clicking on Clear Filters button", () => {
    const wrapper = mount(
      <IntlProvider locale="en">
        <ProductListHeader {...DEFAULT_PROPS} activeFilters={3} />
      </IntlProvider>
    );

    wrapper.find("button").at(0).simulate("click");

    expect(openFiltersMenuMock).toHaveBeenCalledTimes(1);
  });
});
