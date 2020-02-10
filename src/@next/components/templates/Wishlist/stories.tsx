import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Wishlist } from ".";
import { WISHLIST } from "./fixtures";
import { IFiltering, ISorting } from "./types";

const FILTERING: IFiltering = {
  activeFilters: 0,
  clearFilters: action("clearFilters"),
  filterAttributes: [
    {
      id: "1",
      name: "Size",
      slug: "size",
      values: [
        {
          id: "2",
          name: "41",
          slug: "41",
        },
        {
          id: "3",
          name: "42",
          slug: "42",
        },
        {
          id: "4",
          name: "43",
          slug: "43",
        },
        {
          id: "5",
          name: "44",
          slug: "44",
        },
        {
          id: "6",
          name: "45",
          slug: "45",
        },
        {
          id: "7",
          name: "46",
          slug: "46",
        },
      ],
    },
  ],
  filters: {
    attributes: {
      size: ["41"],
    },
    pageSize: 5,
    priceGte: 0,
    priceLte: 0,
    sortBy: "",
  },
  onAttributeFiltersChange: action("onAttributesFiltersChange"),
};

const SORTING: ISorting = {
  onOrder: action("onOrder"),
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
      filtering={FILTERING}
      sorting={SORTING}
      filterSidebarTarget={portalRoot}
    />
  </BrowserRouter>
));
