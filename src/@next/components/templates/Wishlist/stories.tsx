import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
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

storiesOf("@components/templates/Wishlist", module).add("default", () => (
  <BrowserRouter>
    <Wishlist
      wishlist={WISHLIST}
      filtering={GET_FILTERING({
        clearFilters: action("clearFilters"),
        onAttributeFiltersChange: action("onAttributesFiltersChange"),
      })}
      sorting={GET_SORTING({ onOrder: action("onOrder") })}
      filterSidebarTarget={portalRoot}
    />
  </BrowserRouter>
));
