import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductDescription } from ".";

const DEFAULT_PROPS = {
  addToCart: () => null,
  children: null,
  name: "",
  productVariants: [],
  selectedAttributes: [],
};

storiesOf("@components/organisms/ProductDescription", module).add(
  "default",
  () => <ProductDescription {...DEFAULT_PROPS} />
);
