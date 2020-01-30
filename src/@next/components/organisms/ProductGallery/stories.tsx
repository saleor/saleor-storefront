import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductGallery } from ".";
storiesOf("@components/organisms/ProductGallery", module)
.add("default", () =>
<ProductGallery />);