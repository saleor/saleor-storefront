import { storiesOf } from "@storybook/react";
import React from "react";

import { AddressTileOption } from ".";

storiesOf("@components/molecules/AddressTileOption", module)
.addParameters({ component: AddressTileOption })
.add("default", () =>
<AddressTileOption />);