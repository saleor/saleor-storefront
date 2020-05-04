import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { StripePaymentGateway } from ".";

const config = [
  { field: "api_key", value: "pk_test_6pRNASCoBOKtIshFeQd4XMUh" },
];
const processPayment = action("processPayment");
const onError = action("onError");

storiesOf("@components/organisms/StripePaymentGateway", module)
  .addParameters({ component: StripePaymentGateway })
  .add("default", () => (
    <StripePaymentGateway
      config={config}
      processPayment={processPayment}
      onError={onError}
    />
  ));
