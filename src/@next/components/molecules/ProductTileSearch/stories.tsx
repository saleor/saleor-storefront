import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductTileSearch } from ".";
import { PRODUCT } from "./fixtures";

storiesOf("@components/molecules/ProductTileSearch", module)
  .addParameters({ component: ProductTileSearch })
  .add("default", () => (
    <div style={{ width: "400px" }}>
      <ProductTileSearch product={PRODUCT} />
    </div>
  ));
