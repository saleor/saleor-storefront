import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductTileProjects } from ".";
import { PRODUCT } from "./fixtures";

storiesOf("@components/molecules/ProductTileProjects", module)
  .addParameters({ component: ProductTileProjects })
  .add("default", () => (
    <div style={{ width: "400px" }}>
      <ProductTileProjects product={PRODUCT} />
    </div>
  ));
