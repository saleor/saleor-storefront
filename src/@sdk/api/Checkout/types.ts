import {
  Checkout_availablePaymentGateways,
  Checkout_availableShippingMethods,
} from "@sdk/fragments/types/Checkout";
import {
  ICheckoutModelPrice,
  ICheckoutModelPriceValue,
  IPaymentCreditCard,
} from "@sdk/repository";

import { PromiseQueuedResponse, PromiseRunResponse } from "../types";

export type IPrice = ICheckoutModelPrice | null | undefined;
export type IPriceValue = ICheckoutModelPriceValue | null | undefined;

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

export interface IShippingMethod {
  id: string;
  name: string;
  price?: IPriceValue | null;
}

export interface IPromoCodeDiscount {
  voucherCode?: string | null;
  discountName?: string | null;
}

export type ICreditCard = IPaymentCreditCard;

export interface IPayment {
  id?: string;
  token?: string;
  gateway?: string;
  creditCard?: ICreditCard | null;
}

export interface ICheckout {
  id?: string;
  token: any;
  email?: string;
  shippingAddress?: IAddress | null;
  shippingMethod?: IShippingMethod | null;
  billingAddress?: IAddress | null;
}

export interface ISaleorCheckoutAPI {
  loaded: boolean;
  checkout?: ICheckout | null;
  promoCodeDiscount?: IPromoCodeDiscount;
  billingAsShipping?: boolean;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  availableShippingMethods?: IAvailableShippingMethods;
  selectedShippingMethodId?: string;
  availablePaymentGateways?: IAvailablePaymentGateways;
  payment?: IPayment;
  load: () => PromiseQueuedResponse;
  setBillingAddress: (billingAddress: IAddress) => PromiseRunResponse;
  setShippingAddress: (
    shippingAddress: IAddress,
    email: string
  ) => PromiseRunResponse;
  setShippingMethod: (shippingMethodId: string) => PromiseQueuedResponse;
  setBillingAsShippingAddress: (
    billingAsShipping: boolean
  ) => PromiseQueuedResponse;
  addPromoCode: (promoCode: string) => PromiseRunResponse;
  removePromoCode: (promoCode: string) => PromiseRunResponse;
  createPayment: (
    gateway: string,
    token: string,
    creditCard?: ICreditCard
  ) => PromiseRunResponse;
  completeCheckout: () => PromiseRunResponse;
}
