import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { ProductListHeaderStories } from ".";

const DEFAULT_PROPS = {
  activeFilters: 0,
  activeFiltersAttributes: [],
  clearFilters: action("clearFilters"),
  numberOfProducts: 255,
  onChange: action("onChange"),
  onCloseFilterAttribute: action("onAttributeFiltersChange"),
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

storiesOf("@components/molecules/ProductListHeaderStories", module)
  .addParameters({ component: ProductListHeaderStories })
  .add("default", () => (
    <IntlProvider locale="en">
      <ProductListHeaderStories {...DEFAULT_PROPS} />
    </IntlProvider>
  ))
  .add("with active filters", () => (
    <IntlProvider locale="en">
      <ProductListHeaderStories {...DEFAULT_PROPS} activeFilters={3} />
    </IntlProvider>
  ));
