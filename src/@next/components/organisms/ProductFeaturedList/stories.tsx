import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductFeaturedList } from ".";
storiesOf("@components/organisms/ProductFeaturedList", module)
.add("default", () =>
<ProductFeaturedList />);