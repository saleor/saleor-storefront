import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { DummyPaymentGateway } from ".";

const processPayment = action("processPayment");

storiesOf("@components/organisms/DummyPaymentGateway", module)
  .addParameters({ component: DummyPaymentGateway })
  .add("default", () => (
    <DummyPaymentGateway processPayment={processPayment} />
  ));
