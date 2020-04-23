import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { StripePaymentGateway } from ".";

const config = [
  { field: "api_key", value: "pk_test_6pRNASCoBOKtIshFeQd4XMUh" },
];

describe("<StripePaymentGateway />", () => {
  it("exists", () => {
    const processPayment = jest.fn();
    const wrapper = shallow(
      <StripePaymentGateway config={config} processPayment={processPayment} />
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
