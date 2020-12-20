import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductTileStories } from ".";
import { PRODUCT } from "./fixtures";

storiesOf("@components/molecules/ProductTileStories", module)
  .addParameters({ component: ProductTileStories })
  .add("default", () => (
    <div style={{ width: "400px" }}>
      <ProductTileStories product={PRODUCT} />
    </div>
  ));
