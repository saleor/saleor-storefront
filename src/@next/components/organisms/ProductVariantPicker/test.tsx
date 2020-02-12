import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import { components } from "react-select";

import { OverlayItem } from "@components/molecules";
import { SelectSidebar } from "@components/organisms";

import { ProductVariantPicker } from ".";
import { productVariants } from "./fixtures";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

const PROPS = { productVariants };

describe("<ProductVariantPicker />", () => {
  it("exists", () => {
    const wrapper = mount(<ProductVariantPicker {...PROPS} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should select variant attribute value", () => {
    const onChangeVariantPicker = jest.fn();

    const wrapper = mount(
      <ProductVariantPicker
        {...PROPS}
        selectSidebar={false}
        onChange={onChangeVariantPicker}
      />
    );

    wrapper
      .find("input")
      .at(0)
      .simulate("focus");
    wrapper
      .find(components.Option)
      .at(1)
      .simulate("click");

    expect(wrapper.text()).toContain("wool");

    expect(onChangeVariantPicker).toHaveBeenCalled();
  });

  it("should disable possible selection of other variant attribute values after selection of one variant attribute values", () => {
    const wrapper = mount(
      <ProductVariantPicker selectSidebar={false} {...PROPS} />
    );

    // Select value for first attribute
    wrapper
      .find("input")
      .at(0)
      .simulate("focus");
    wrapper
      .find(components.Option)
      .at(1)
      .simulate("click");

    // Check if values are possible to select (disable or not) for another attribute
    wrapper
      .find("input")
      .at(1)
      .simulate("focus");
    expect(
      wrapper
        .find(components.Option)
        .at(0)
        .prop("isDisabled")
    ).toBe(true);
    expect(
      wrapper
        .find(components.Option)
        .at(1)
        .prop("isDisabled")
    ).toBe(false);
    expect(
      wrapper
        .find(components.Option)
        .at(2)
        .prop("isDisabled")
    ).toBe(true);
  });

  it("should select variant attribute value with sidebar", () => {
    const onChangeVariantPicker = jest.fn();

    const wrapper = mount(
      <ProductVariantPicker
        {...PROPS}
        selectSidebar={true}
        selectSidebarTarget={portalRoot}
        onChange={onChangeVariantPicker}
      />
    );

    wrapper
      .find("input")
      .at(0)
      .simulate("focus");
    wrapper
      .find(OverlayItem)
      .at(1)
      .simulate("click");

    expect(
      wrapper
        .find("input")
        .at(0)
        .props().value
    ).toEqual("wool");

    expect(onChangeVariantPicker).toHaveBeenCalled();
  });

  it("should disable possible selection of other variant attribute values after selection of one variant attribute values with sidebar", () => {
    const wrapper = mount(
      <ProductVariantPicker
        selectSidebar={true}
        selectSidebarTarget={portalRoot}
        {...PROPS}
      />
    );

    // Select value for first attribute
    wrapper
      .find("input")
      .at(0)
      .simulate("focus");
    wrapper
      .find(OverlayItem)
      .at(1)
      .simulate("click");

    // Check if values are possible to select (disable or not) for another attribute
    wrapper
      .find("input")
      .at(1)
      .simulate("focus");
    expect(
      wrapper
        .find(SelectSidebar)
        .at(1)
        .find(OverlayItem)
        .at(0)
        .prop("disabled")
    ).toBe(true);
    expect(
      wrapper
        .find(SelectSidebar)
        .at(1)
        .find(OverlayItem)
        .at(1)
        .prop("disabled")
    ).toBe(false);
    expect(
      wrapper
        .find(SelectSidebar)
        .at(1)
        .find(OverlayItem)
        .at(2)
        .prop("disabled")
    ).toBe(true);
  });
});
