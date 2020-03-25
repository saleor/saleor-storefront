import React from "react";
import { useLocation } from "react-router-dom";

import { CheckoutProgressBar } from "@components/molecules";
import { CartSummary } from "@components/organisms";
import { CartSummaryProductList } from "@components/organisms/CartSummary/styles";
import { Checkout } from "@components/templates";
import { useCheckout } from "@sdk/react";

import { IProps } from "./types";

const steps = [
  {
    link: "/new-checkout/shipping",
    name: "Shipping",
  },
  {
    link: "/new-checkout/billing",
    name: "Billing",
  },
  {
    link: "/new-checkout/payment",
    name: "Payment",
  },
  {
    link: "/new-checkout/review",
    name: "Review",
  },
];

const CheckoutPage: React.FC<IProps> = ({}: IProps) => {
  const { pathname } = useLocation();

  const checkoutProgress = (
    <CheckoutProgressBar
      steps={steps}
      activeStep={steps.findIndex(({ link }) => link === pathname)}
    />
  );
  const cartSummary = <CartSummary />;

  return <Checkout navigation={checkoutProgress} cartSummary={cartSummary} />;
};

export { CheckoutPage };
