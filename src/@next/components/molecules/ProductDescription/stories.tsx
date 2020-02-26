import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductDescription } from ".";
import { attributes, description } from "./fixtures";

storiesOf("@components/molecules/ProductDescription", module)
  .addParameters({ component: ProductDescription })
  .add("default", () => (
    <ProductDescription attributes={attributes} description={description} />
  ));
