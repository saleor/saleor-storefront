import React from "react";

import { Checkout } from "@components/templates";
import { useCheckout } from "@sdk/react";
import { CheckoutProgressBar } from "@components/molecules";
import { CartSummary } from "@components/organisms";

import { IProps } from "./types";
import { CartSummaryProductList } from "../../components/organisms/CartSummary/styles";

const steps = [
  {
    name: "Shipping",
    link: "new-checkout/shipping",
  },
  {
    name: "Billing",
    link: "new-checkout/billing",
  },
  {
    name: "Payment",
    link: "new-checkout/payment",
  },
  {
    name: "Review",
    link: "new-checkout/review",
  },
];

const CheckoutPage: React.FC<IProps> = ({}: IProps) => {
  const checkoutProgress = <CheckoutProgressBar steps={steps} activeStep={0} />;
  const cartSummary = <CartSummary />;
  return <Checkout navigation={checkoutProgress} cartSummary={cartSummary} />;
};

export { CheckoutPage };
