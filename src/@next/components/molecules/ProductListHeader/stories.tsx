import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductListHeader } from ".";

const DEFAULT_PROPS = {
  activeFilters: 0,
  clearFilters: action("clearFilters"),
  numberOfProducts: 255,
  openFiltersMenu: action("openFiltersMenu"),
};

storiesOf("@components/molecules/ProductListHeader", module)
  .add("default", () => <ProductListHeader {...DEFAULT_PROPS} />)
  .add("with active filters", () => (
    <ProductListHeader {...DEFAULT_PROPS} activeFilters={3} />
  ));
