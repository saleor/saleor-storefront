import { storiesOf } from "@storybook/react";
import React from "react";

import { StripePaymentGateway } from ".";

storiesOf("@components/organisms/StripePaymentGateway", module)
  .addParameters({ component: StripePaymentGateway })
  .add("default", () => <StripePaymentGateway />);
