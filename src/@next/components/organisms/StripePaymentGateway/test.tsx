import "jest-styled-components";

import { shallow } from "enzyme";
import React from "react";
import { IntlProvider } from "react-intl";

import { StripePaymentGateway } from ".";

const config = [
  { field: "api_key", value: "pk_test_6pRNASCoBOKtIshFeQd4XMUh" },
];

describe("<StripePaymentGateway />", () => {
  it("exists", () => {
    const processPayment = jest.fn();
    const submitPayment = jest.fn();
    const submitPaymentSuccess = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <IntlProvider locale="en">
        <StripePaymentGateway
          config={config}
          processPayment={processPayment}
          submitPayment={submitPayment}
          submitPaymentSuccess={submitPaymentSuccess}
          onError={onError}
        />
      </IntlProvider>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
