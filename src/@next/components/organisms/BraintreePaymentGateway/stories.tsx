import { storiesOf } from "@storybook/react";
import React from "react";

import { BraintreePaymentGateway } from ".";

storiesOf("@components/organisms/BraintreePaymentGateway", module)
  .addParameters({ component: BraintreePaymentGateway })
  .add("default", () => <BraintreePaymentGateway />);
