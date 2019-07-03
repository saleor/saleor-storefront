import { storiesOf } from "@storybook/react";
import React from "react";

import { CachedImage } from ".";
storiesOf("@components/molecules/CachedImage", module)
.add("default", () =>
<CachedImage />);