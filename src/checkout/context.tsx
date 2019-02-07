import { createContext } from "react";

import { CheckoutCreateInput } from "../../types/globalTypes";
import { Omit } from "../core/tsUtils";
import { Checkout } from "./types/Checkout";
import { createCheckout_checkoutCreate_errors } from "./types/createCheckout";

export enum CheckoutStep {
  ShippingAddress = 1,
  ShippingOption,
  BillingAddress,
  Payment,
  Review
}

export interface CardData {
  lastDigits: string;
  ccType: string;
  token: string;
}

export interface CheckoutContextInterface {
  syncWithCart?: boolean;
  cardData?: CardData;
  checkout?: Checkout;
  loading?: boolean;
  shippingAsBilling?: boolean;
  step?: CheckoutStep;
  update?(checkoutData: CheckoutContextInterface): void;
  clear?(): void;
}

export const defaultContext = {
  cardData: null,
  checkout: null,
  clear: () => null,
  loading: false,
  shippingAsBilling: false,
  step: CheckoutStep.ShippingAddress,
  syncWithCart: false,
  update: (checkoutData: {}) => null
};

export const CheckoutContext = createContext<CheckoutContextInterface>(
  defaultContext
);
