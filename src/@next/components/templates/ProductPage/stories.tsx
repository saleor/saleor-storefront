import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductPage } from ".";
storiesOf("@components/templates/ProductPage", module)
.add("default", () =>
<ProductPage />);