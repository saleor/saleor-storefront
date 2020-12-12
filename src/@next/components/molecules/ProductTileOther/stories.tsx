import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductTileOther } from ".";
import { PRODUCT } from "./fixtures";

storiesOf("@components/molecules/ProductTileOther", module)
  .addParameters({ component: ProductTileOther })
  .add("default", () => (
    <div style={{ width: "400px" }}>
      <ProductTileOther product={PRODUCT} />
    </div>
  ));
