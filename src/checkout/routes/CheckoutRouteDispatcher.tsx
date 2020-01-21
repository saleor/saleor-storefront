import * as React from "react";
import { generatePath, Redirect } from "react-router";

import { useVariantsProducts } from "@sdk/react";

import {
  billingUrl,
  paymentUrl,
  reviewUrl,
  shippingAddressUrl,
  shippingOptionsUrl,
} from ".";
import { Loader } from "../../components";
import { CartContext } from "../../components/CartProvider/context";
import { CheckoutContext } from "../context";
import { CheckoutStep, useCheckoutStepState } from "../hooks";

export const CheckoutRouteDispatcher = ({ match }) => {
  const {
    params: { token },
  } = match;

  const {
    loading: checkoutLoading,
    checkout,
    cardData,
    dummyStatus,
  } = React.useContext(CheckoutContext);
  const { lines: cartLines } = React.useContext(CartContext);

  const {
    data: variantsProducts,
    loading: variantsProductsLoading,
  } = useVariantsProducts({
    ids: cartLines ? cartLines.map(line => line.variantId) : [],
  });

  const step = useCheckoutStepState(
    checkout,
    variantsProducts,
    cardData,
    dummyStatus
  );

  if (checkoutLoading || variantsProductsLoading || !step) {
    return <Loader />;
  }

  switch (step) {
    case CheckoutStep.BillingAddress:
      return <Redirect to={generatePath(billingUrl, { token })} />;
    case CheckoutStep.ShippingAddress:
      return <Redirect to={generatePath(shippingAddressUrl, { token })} />;
    case CheckoutStep.Review:
      return <Redirect to={generatePath(reviewUrl, { token })} />;
    case CheckoutStep.Payment:
      return <Redirect to={generatePath(paymentUrl, { token })} />;
    case CheckoutStep.ShippingOption:
      return <Redirect to={generatePath(shippingOptionsUrl, { token })} />;
  }
};
