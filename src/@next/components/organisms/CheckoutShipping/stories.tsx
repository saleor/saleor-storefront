import { storiesOf } from "@storybook/react";
import React from "react";

import { CheckoutShipping } from ".";

storiesOf("@components/organisms/CheckoutShipping", module)
.addParameters({ component: CheckoutShipping })
.add("default", () =>
<CheckoutShipping />);