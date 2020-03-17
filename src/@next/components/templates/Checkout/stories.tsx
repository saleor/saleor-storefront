import { storiesOf } from "@storybook/react";
import React from "react";

import { Checkout } from ".";

storiesOf("@components/templates/Checkout", module)
.addParameters({ component: Checkout })
.add("default", () =>
<Checkout />);