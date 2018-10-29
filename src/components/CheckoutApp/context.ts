import { createContext } from "react";

import { CheckoutInterface } from "../../core/types";

export interface CheckoutContextInterface {
  cardData?: {
    lastDigits: string;
    ccType: string;
    token: string;
  };
  checkout?: CheckoutInterface;
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
