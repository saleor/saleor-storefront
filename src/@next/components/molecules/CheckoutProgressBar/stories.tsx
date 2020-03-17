import { storiesOf } from "@storybook/react";
import React from "react";

import { CheckoutProgressBar } from ".";

storiesOf("@components/molecules/CheckoutProgressBar", module)
.addParameters({ component: CheckoutProgressBar })
.add("default", () =>
<CheckoutProgressBar />);