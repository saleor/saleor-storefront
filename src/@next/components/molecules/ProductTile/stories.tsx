import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductTile } from ".";
import { PRODUCT } from "./fixtures";

storiesOf("@components/molecules/ProductTile", module)
  .addParameters({ component: ProductTile })
  .add("default", () => (
    <div style={{ width: "400px" }}>
      <ProductTile product={PRODUCT} />
    </div>
  ));
