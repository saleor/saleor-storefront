import * as React from "react";
import { Redirect } from "react-router";

import { useVariantsProducts } from "@sdk/react";

import { Loader } from "../../components";
import { CartContext } from "../../components/CartProvider/context";
import { CheckoutContext } from "../context";
import { CheckoutStep, useCheckoutStepState } from "../hooks";
import {
  billingUrl,
  paymentUrl,
  reviewUrl,
  shippingAddressUrl,
  shippingOptionsUrl,
} from "./";

export const CheckoutRoute = () => {
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
      return <Redirect to={billingUrl} />;
    case CheckoutStep.ShippingAddress:
      return <Redirect to={shippingAddressUrl} />;
    case CheckoutStep.Review:
      return <Redirect to={reviewUrl} />;
    case CheckoutStep.Payment:
      return <Redirect to={paymentUrl} />;
    case CheckoutStep.ShippingOption:
      return <Redirect to={shippingOptionsUrl} />;
  }
};
