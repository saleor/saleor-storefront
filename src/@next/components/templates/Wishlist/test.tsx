import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Wishlist } from ".";
import { GET_FILTERING, GET_SORTING, WISHLIST } from "./fixtures";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

describe("<Wishlist />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <Wishlist
          wishlist={WISHLIST}
          filtering={GET_FILTERING({
            clearFilters: jest.fn(),
            onAttributeFiltersChange: jest.fn(),
          })}
          sorting={GET_SORTING({ onOrder: jest.fn() })}
          filterSidebarTarget={portalRoot}
        />
      </BrowserRouter>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
