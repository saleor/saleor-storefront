import {
  Checkout_availablePaymentGateways,
  Checkout_availableShippingMethods,
} from "@sdk/fragments/types/Checkout";
import { Payment_creditCard } from "@sdk/fragments/types/Payment";
import { ICheckoutModelPrice, ICheckoutModelPriceValue } from "@sdk/repository";

import { PromiseResponse } from "../types";

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

export type ICreditCard = Payment_creditCard;

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
  promoCode?: string | null;
  billingAsShipping?: boolean;
  selectedShippingAddressId?: string;
  selectedBillingAddressId?: string;
  availableShippingMethods?: IAvailableShippingMethods;
  selectedShippingMethodId?: string;
  availablePaymentGateways?: IAvailablePaymentGateways;
  payment?: IPayment;
  load: () => PromiseResponse;
  setBillingAddress: (billingAddress: IAddress) => PromiseResponse;
  setShippingAddress: (
    shippingAddress: IAddress,
    email: string
  ) => PromiseResponse;
  setShippingMethod: (shippingMethodId: string) => PromiseResponse;
  setBillingAsShippingAddress: (billingAsShipping: boolean) => PromiseResponse;
  createPayment: (gateway: string, token: string) => PromiseResponse;
  makeOrder: () => PromiseResponse;
}
