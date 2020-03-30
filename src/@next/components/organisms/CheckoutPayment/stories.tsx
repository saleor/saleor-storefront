import { storiesOf } from "@storybook/react";
import React from "react";

import { CheckoutPayment } from ".";

storiesOf("@components/organisms/CheckoutPayment", module)
.addParameters({ component: CheckoutPayment })
.add("default", () =>
<CheckoutPayment />);