import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { StripePaymentGateway } from ".";

const config = [
  { field: "api_key", value: "pk_test_6pRNASCoBOKtIshFeQd4XMUh" },
];
const processPayment = action("processPayment");
const submitPayment = async () => Promise.resolve({});
const submitPaymentSuccess = action("submitPaymentSuccess");
const onError = action("onError");

storiesOf("@components/organisms/StripePaymentGateway", module)
  .addParameters({ component: StripePaymentGateway })
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => (
    <StripePaymentGateway
      config={config}
      processPayment={processPayment}
      submitPayment={submitPayment}
      submitPaymentSuccess={submitPaymentSuccess}
      onError={onError}
    />
  ));
