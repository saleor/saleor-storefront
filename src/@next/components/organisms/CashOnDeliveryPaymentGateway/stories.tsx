import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { CashOnDeliveryPaymentGateway } from ".";

const processPayment = action("processPayment");

storiesOf("@components/organisms/DummyPaymentGateway", module)
  .addParameters({ component: CashOnDeliveryPaymentGateway })
  .add("default", () => (
    <CashOnDeliveryPaymentGateway processPayment={processPayment} />
  ));
