import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";

import { AdyenPaymentGateway } from ".";
import { adyenPaymentMethods } from "./fixtures";

const PROPS = {
  scriptSrc:
    "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js",
  styleSrc:
    "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.css",
  config: [
    {
      field: "client_key",
      value: "FAKE_ORIGIN_KEY",
    },
    {
      field: "config",
      value: JSON.stringify(adyenPaymentMethods.paymentMethods),
    },
  ],
};
const processPayment = action("processPayment");
const submitPayment = async () => action("submitPayment");
const submitPaymentSuccess = action("submitPaymentSuccess");
const onError = action("onError");

storiesOf("@components/organisms/AdyenPaymentGateway", module)
  .addParameters({ component: AdyenPaymentGateway })
  .add("default", () => (
    <AdyenPaymentGateway
      {...PROPS}
      processPayment={processPayment}
      submitPayment={submitPayment}
      submitPaymentSuccess={submitPaymentSuccess}
      onError={onError}
    />
  ));
