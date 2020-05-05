import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { BraintreePaymentGateway } from ".";

const config = [{ field: "client_token", value: "token_test_1234567890" }];
const processPayment = action("processPayment");
const onError = action("onError");

storiesOf("@components/organisms/BraintreePaymentGateway", module)
  .addParameters({ component: BraintreePaymentGateway })
  .add("default", () => (
    <BraintreePaymentGateway
      config={config}
      processPayment={processPayment}
      onError={onError}
    />
  ));
