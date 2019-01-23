import * as React from "react";
import { Redirect } from "react-router";

import { CheckoutContext, CheckoutStep } from "../../context";
import { baseUrl, shippingAddressUrl } from "../../routes";

const getRedirectUrl = (step: CheckoutStep): string => {
  switch (step) {
    case CheckoutStep.ShippingAddress:
      return shippingAddressUrl;

    default:
      return baseUrl;
  }
};

const CheckoutInit: React.FC = () => (
  <CheckoutContext.Consumer>
    {({ step }) => <Redirect to={getRedirectUrl(step)} />}
  </CheckoutContext.Consumer>
);

export default CheckoutInit;
