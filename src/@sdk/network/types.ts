import { ApolloError } from "apollo-client";

import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IOrderModel,
  IPaymentModel,
} from "@sdk/repository";

export enum PendingSaveItems {
  UPDATE_CART = "updateCart",
  BILLING_ADDRESS = "billingAddress",
  SHIPPING_ADDRESS = "shippingAddress",
  SHIPPING_AS_BILLING_ADDRESS = "shippingAsBillingAddress",
}

export interface ApolloErrorWithUserInput extends ApolloError {
  extraInfo: {
    userInputErrors?: any[];
  };
}

export interface INetworkManagerResponse<T> {
  data?: T;
  error?: ApolloErrorWithUserInput;
}

export interface INetworkManager {
  getCheckout: (
    checkoutToken: string | null,
    locale: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  getRefreshedCheckoutLines: (
    checkoutlines: ICheckoutModelLine[] | null,
    locale: string
  ) => Promise<INetworkManagerResponse<ICheckoutModelLine[]>>;
  createCheckout: (
    email: string,
    lines: Array<{ variantId: string; quantity: number }>,
    shippingAddress: ICheckoutAddress,
    billingAddress?: ICheckoutAddress,
    locale?: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setCartItem: (
    checkout: ICheckoutModel,
    locale: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setBillingAddress: (
    billingAddress: ICheckoutAddress,
    checkoutId: string,
    locale: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setBillingAddressWithEmail: (
    billingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string,
    locale: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setShippingAddress: (
    shippingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string,
    locale: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setShippingMethod: (
    shippingMethodId: string,
    checkoutId: string,
    locale: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  addPromoCode: (
    promoCode: string,
    checkoutId: string,
    locale: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  removePromoCode: (
    promoCode: string,
    checkoutId: string,
    locale: string
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  createPayment: (
    amount: number,
    checkoutId: string,
    paymentGateway: string,
    paymentToken: string,
    billingAddress: ICheckoutAddress,
    locale: string
  ) => Promise<INetworkManagerResponse<IPaymentModel>>;
  completeCheckout: (
    checkoutId: string,
    locale: string
  ) => Promise<INetworkManagerResponse<IOrderModel>>;
}
