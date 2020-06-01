import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { BraintreePaymentGateway } from ".";

const config = [{ field: "client_token", value: "token_test_1234567890" }];

describe("<BraintreePaymentGateway />", () => {
  it("exists", () => {
    const processPayment = jest.fn();
    const onError = jest.fn();
    const wrapper = shallow(
      <BraintreePaymentGateway
        config={config}
        processPayment={processPayment}
        onError={onError}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
