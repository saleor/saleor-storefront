import { createContext } from "react";

import { CardData } from "./types/CardData";
import { Checkout } from "./types/Checkout";

export enum CheckoutStep {
  ShippingAddress = 1,
  ShippingOption,
  BillingAddress,
  Payment,
  Review,
}

export interface CheckoutContextInterface {
  syncWithCart?: boolean; // To remove
  syncUserCheckout?: boolean; // To remove
  dummyStatus?: string | null;
  cardData?: CardData | null; // To remove
  checkout?: Checkout | null; // Done
  loading?: boolean; // Done
  shippingAsBilling?: boolean; // Done
  /*
   * @deprecated Use useCheckoutStepState hook to determine step instead.
   */
  step?: CheckoutStep; // To remove
  update?(checkoutData: CheckoutContextInterface): void; // ?
  clear?(): void; // ?
}

export const defaultContext = {
  cardData: null,
  checkout: null,
  clear: () => null,
  dummyStatus: null,
  loading: false,
  shippingAsBilling: false,
  step: CheckoutStep.ShippingAddress,
  syncUserCheckout: false,
  syncWithCart: false,
  update: (checkoutData: {}) => null,
};

export const CheckoutContext = createContext<CheckoutContextInterface>(
  defaultContext
);

CheckoutContext.displayName = "CheckoutContext";
