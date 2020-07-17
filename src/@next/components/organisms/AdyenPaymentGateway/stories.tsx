import { storiesOf } from "@storybook/react";
import React from "react";

import { AdyenPaymentGateway } from ".";

storiesOf("@components/organisms/AdyenPaymentGateway", module)
  .addParameters({ component: AdyenPaymentGateway })
  .add("default", () => <AdyenPaymentGateway />);
