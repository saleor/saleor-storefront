import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { PaymentGatewaysList } from ".";
import { paymentGateways, paymentDetails } from "./fixtures";

const processPayment = action("processPayment");
const initializePayment = async () => action("initializePayment");
const submitPayment = async () => action("submitPayment");
const submitPaymentSuccess = action("submitPaymentSuccess");
const selectPaymentGateway = action("selectPaymentGateway");
const onError = action("onError");

storiesOf("@components/organisms/PaymentGatewaysList", module)
  .addParameters({ component: PaymentGatewaysList })
  .add("default", () => (
    <PaymentGatewaysList
      paymentDetails={paymentDetails}
      paymentGateways={paymentGateways}
      processPayment={processPayment}
      initializePayment={initializePayment}
      submitPayment={submitPayment}
      submitPaymentSuccess={submitPaymentSuccess}
      selectPaymentGateway={selectPaymentGateway}
      onError={onError}
    />
  ));
