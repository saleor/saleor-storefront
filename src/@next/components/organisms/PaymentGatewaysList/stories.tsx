import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { PaymentGatewaysList } from ".";
import { paymentGateways } from "./fixtures";

const processPayment = action("processPayment");
const processPaymentAdditionalActions = action(
  "processPaymentAdditionalActions"
);
const submitPayment = async () => action("submitPayment");
const submitPaymentSuccess = action("submitPaymentSuccess");
const selectPaymentGateway = action("selectPaymentGateway");
const onError = action("onError");

storiesOf("@components/organisms/PaymentGatewaysList", module)
  .addParameters({ component: PaymentGatewaysList })
  .add("default", () => (
    <PaymentGatewaysList
      paymentGateways={paymentGateways}
      processPayment={processPayment}
      processPaymentAdditionalActions={processPaymentAdditionalActions}
      submitPayment={submitPayment}
      submitPaymentSuccess={submitPaymentSuccess}
      selectPaymentGateway={selectPaymentGateway}
      onError={onError}
    />
  ));
