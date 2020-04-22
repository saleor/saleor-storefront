import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { StripeInputElement } from ".";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

describe("<StripeInputElement />", () => {
  it("renders cart number input", () => {
    const wrapper = shallow(
      <Elements stripe={stripePromise}>
        <StripeInputElement type="CardNumber" />
      </Elements>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("renders cart cvc input", () => {
    const wrapper = shallow(
      <Elements stripe={stripePromise}>
        <StripeInputElement type="CardCvc" />
      </Elements>
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("renders cart expiry input", () => {
    const wrapper = shallow(
      <Elements stripe={stripePromise}>
        <StripeInputElement type="CardExpiry" />
      </Elements>
    );

    expect(wrapper.exists()).toEqual(true);
  });
});
