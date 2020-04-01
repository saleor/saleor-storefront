import {
  Checkout_availablePaymentGateways,
  Checkout_availableShippingMethods,
} from "@sdk/fragments/types/Checkout";

import { PromiseResponse } from "../types";

export interface IAddress {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  countryArea?: string;
  phone?: string | null;
  country?: {
    code?: string;
    country?: string;
  };
}

export type IAvailableShippingMethods = Checkout_availableShippingMethods[];
export type IAvailablePaymentGateways = Checkout_availablePaymentGateways[];

export interface ICheckout {
  id: string | undefined;
  email: string | undefined;
  shippingAddress: IAddress | null | undefined;
  billingAddress: IAddress | null | undefined;
}

export interface ISaleorCheckoutAPI {
  checkout?: ICheckout | null;
  promoCode?: string | null;
  billingAsShipping?: boolean;
  selectedShippingAddressId?: string;
  availableShippingMethods?: IAvailableShippingMethods;
  availablePaymentGateways?: IAvailablePaymentGateways;
  load: () => PromiseResponse;
  setBillingAddress: (billingAddress: IAddress) => PromiseResponse;
  setShippingAddress: (
    shippingAddress: IAddress,
    email: string
  ) => PromiseResponse;
  setBillingAsShippingAddress: (billingAsShipping: boolean) => PromiseResponse;
  makeOrder: () => PromiseResponse;
}