import { storiesOf } from "@storybook/react";
import React from "react";

import { PaymentGatewayList } from ".";

storiesOf("@components/organisms/PaymentGatewayList", module)
.addParameters({ component: PaymentGatewayList })
.add("default", () =>
<PaymentGatewayList />);