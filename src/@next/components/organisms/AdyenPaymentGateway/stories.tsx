import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { IntlProvider } from "react-intl";

import { AdyenPaymentGateway } from ".";
import { adyenPaymentMethods } from "./fixtures";

const PROPS = {
  scriptConfig: {
    src:
      "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js",
    integrity:
      "sha384-wG2z9zSQo61EIvyXmiFCo+zB3y0ZB4hsrXVcANmpP8HLthjoQJQPBh7tZKJSV8jA",
    crossOrigin: "anonymous",
  },
  styleConfig: {
    src:
      "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.css",
    integrity:
      "sha384-8ofgICZZ/k5cC5N7xegqFZOA73H9RQ7H13439JfAZW8Gj3qjuKL2isaTD3GMIhDE",
    crossOrigin: "anonymous",
  },
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
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => (
    <AdyenPaymentGateway
      {...PROPS}
      processPayment={processPayment}
      submitPayment={submitPayment}
      submitPaymentSuccess={submitPaymentSuccess}
      onError={onError}
    />
  ));
