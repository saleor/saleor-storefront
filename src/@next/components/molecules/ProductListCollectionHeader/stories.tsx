import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductListCollectionHeader } from ".";

const DEFAULT_PROPS = {
  activeFilters: 0,
  clearFilters: action("clearFilters"),
  numberOfProducts: 255,
  onChange: action("onChange"),
  openFiltersMenu: action("openFiltersMenu"),
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

storiesOf("@components/molecules/ProductListCollectionHeader", module)
  .add("default", () => <ProductListCollectionHeader {...DEFAULT_PROPS} />)
  .add("with active filters", () => (
    <ProductListCollectionHeader {...DEFAULT_PROPS} activeFilters={3} />
  ));
