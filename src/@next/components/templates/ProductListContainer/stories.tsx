import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductListContainer } from ".";
storiesOf("@components/templates/ProductListContainer", module)
.add("default", () =>
<ProductListContainer />);