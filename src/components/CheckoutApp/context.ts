import { createContext } from "react";

import { Checkout } from "./types/Checkout";

export interface CheckoutContextInterface {
  cardData?: {
    lastDigits: string;
    ccType: string;
    token: string;
  };
  checkout?: Checkout;
  loading?: boolean;
  shippingAsBilling?: boolean;
  updateCheckout?(chekcoutData: CheckoutContextInterface): void;
  clearCheckout?(): void;
}

export const CheckoutContext = createContext<CheckoutContextInterface>({
  cardData: null,
  checkout: null,
  clearCheckout: () => null,
  loading: false,
  updateCheckout: (checkoutData: {}) => null
});
