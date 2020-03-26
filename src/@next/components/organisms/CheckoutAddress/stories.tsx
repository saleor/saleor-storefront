import { storiesOf } from "@storybook/react";
import React from "react";

import { CheckoutAddress } from ".";

storiesOf("@components/organisms/CheckoutAddress", module)
.addParameters({ component: CheckoutAddress })
.add("default", () =>
<CheckoutAddress />);