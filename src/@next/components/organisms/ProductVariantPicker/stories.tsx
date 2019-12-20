import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductVariantPicker } from ".";
storiesOf("@components/organisms/ProductVariantPicker", module).add(
  "default",
  () => <ProductVariantPicker />
);
