import { storiesOf } from "@storybook/react";
import React from "react";

import { PaymentGatewaysList } from ".";

storiesOf("@components/organisms/PaymentGatewaysList", module)
  .addParameters({ component: PaymentGatewaysList })
  .add("default", () => <PaymentGatewaysList />);
