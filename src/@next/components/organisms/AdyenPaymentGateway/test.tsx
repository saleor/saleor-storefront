import { shallow } from "enzyme";
import "jest-styled-components";
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

describe("<AdyenPaymentGateway />", () => {
  it("exists", () => {
    const processPayment = jest.fn();
    const submitPayment = jest.fn();
    const submitPaymentSuccess = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <AdyenPaymentGateway
        {...PROPS}
        processPayment={processPayment}
        submitPayment={submitPayment}
        submitPaymentSuccess={submitPaymentSuccess}
        onError={onError}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
