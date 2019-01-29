import { createContext } from "react";

import { CheckoutCreateInput } from "../../types/globalTypes";
import { Omit } from "../core/tsUtils";
import { Checkout } from "./types/Checkout";
import { createCheckout_checkoutCreate_errors } from "./types/createCheckout";

export enum CheckoutStep {
  ShippingAddress = "Shipping Address",
  ShippingOption = "Shipping Option",
  BillingAddress = "Billing Address",
  Payment = "Payment",
  Review = "Review"
}

export type CheckoutCreateData = Omit<CheckoutCreateInput, "lines">;
export type CheckoutErrors = createCheckout_checkoutCreate_errors[];

export interface CheckoutContextInterface {
  cardData?: {
    lastDigits: string;
    ccType: string;
    token: string;
  };
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
  update: (checkoutData: {}) => null
};

export const CheckoutContext = createContext<CheckoutContextInterface>(
  defaultContext
);
