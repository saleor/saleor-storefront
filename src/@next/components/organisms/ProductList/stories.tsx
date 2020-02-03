import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductList } from ".";
import { PRODUCTS } from "./fixtures";

storiesOf("@components/organisms/ProductList", module).add("default", () => (
  <ProductList products={PRODUCTS} totalCount={PRODUCTS.length} />
));
