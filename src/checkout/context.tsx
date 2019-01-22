import { createContext } from "react";

import { Checkout } from "./types/Checkout";

enum CheckoutStep {
  ShippingAddress,
  ShippingOption,
  BillingAddress,
  Payment,
  Review
}

export interface CheckoutContextInterface {
  step?: CheckoutStep;
  cardData?: {
    lastDigits: string;
    ccType: string;
    token: string;
  };
  checkout?: Checkout;
  loading?: boolean;
  shippingAsBilling?: boolean;
  updateCheckout?(checkoutData: CheckoutContextInterface): void;
  clearCheckout?(): void;
}

export const defaultContext = {
  cardData: null,
  checkout: null,
  clearCheckout: () => null,
  loading: false,
  step: CheckoutStep.ShippingAddress,
  updateCheckout: (checkoutData: {}) => null
};

export const CheckoutContext = createContext<CheckoutContextInterface>(
  defaultContext
);
