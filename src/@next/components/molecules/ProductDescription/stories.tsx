import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductDescription } from ".";
import { attributes, description } from "./fixtures";

storiesOf("@components/molecules/ProductDescription", module).add(
  "default",
  () => <ProductDescription attributes={attributes} description={description} />
);
