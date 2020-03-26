import React from "react";
import { useLocation } from "react-router-dom";

import { CheckoutProgressBar } from "@components/molecules";
import { CartSummary } from "@components/organisms";
import { Checkout } from "@components/templates";
import { useCart, useCheckout } from "@sdk/react";

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
  const { shippingPrice, subtotalPrice, totalPrice, items } = useCart();

  const products = items?.map(({ variant, totalPrice, quantity }) => ({
    name: variant.name || "",
    price: {
      gross: {
        amount: totalPrice?.gross.amount || 0,
        currency: totalPrice?.gross.currency || "",
      },
      net: {
        amount: totalPrice?.net.amount || 0,
        currency: totalPrice?.net.currency || "",
      },
    },
    quantity,
    sku: variant.sku || "",
    thumbnail: {
      alt: variant.product?.thumbnail?.alt || undefined,
      url: variant.product?.thumbnail?.url,
      url2x: variant.product?.thumbnail2x?.url,
    },
  }));

  const checkoutProgress = (
    <CheckoutProgressBar
      steps={steps}
      activeStep={steps.findIndex(({ link }) => link === pathname)}
    />
  );
  const cartSummary = (
    <CartSummary
      shipping={shippingPrice || undefined}
      subtotal={subtotalPrice || undefined}
      total={totalPrice || undefined}
      products={products}
    />
  );

  return <Checkout navigation={checkoutProgress} cartSummary={cartSummary} />;
};

export { CheckoutPage };
