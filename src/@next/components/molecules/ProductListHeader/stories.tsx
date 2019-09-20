import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductListHeader } from ".";
storiesOf("@components/molecules/ProductListHeader", module)
.add("default", () =>
<ProductListHeader />);