import { ApolloError } from "apollo-client";

import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IOrderModel,
  IPaymentModel,
} from "@temp/@sdk/helpers/LocalStorageHandler";

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

export interface IApolloClientManagerResponse<T> {
  data?: T;
  error?: ApolloErrorWithUserInput;
}

export interface IApolloClientManager {
  getCheckout: (
    checkoutToken: string | null
  ) => Promise<IApolloClientManagerResponse<ICheckoutModel>>;
  getRefreshedCheckoutLines: (
    checkoutlines: ICheckoutModelLine[] | null
  ) => Promise<IApolloClientManagerResponse<ICheckoutModelLine[]>>;
  createCheckout: (
    email: string,
    lines: Array<{ variantId: string; quantity: number }>,
    shippingAddress: ICheckoutAddress,
    billingAddress?: ICheckoutAddress
  ) => Promise<IApolloClientManagerResponse<ICheckoutModel>>;
  setCartItem: (
    checkout: ICheckoutModel
  ) => Promise<IApolloClientManagerResponse<ICheckoutModel>>;
  setBillingAddress: (
    billingAddress: ICheckoutAddress,
    checkoutId: string
  ) => Promise<IApolloClientManagerResponse<ICheckoutModel>>;
  setBillingAddressWithEmail: (
    billingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string
  ) => Promise<IApolloClientManagerResponse<ICheckoutModel>>;
  setShippingAddress: (
    shippingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string
  ) => Promise<IApolloClientManagerResponse<ICheckoutModel>>;
  setShippingMethod: (
    shippingMethodId: string,
    checkoutId: string
  ) => Promise<IApolloClientManagerResponse<ICheckoutModel>>;
  addPromoCode: (
    promoCode: string,
    checkoutId: string
  ) => Promise<IApolloClientManagerResponse<ICheckoutModel>>;
  removePromoCode: (
    promoCode: string,
    checkoutId: string
  ) => Promise<IApolloClientManagerResponse<ICheckoutModel>>;
  createPayment: (
    amount: number,
    checkoutId: string,
    paymentGateway: string,
    paymentToken: string,
    billingAddress: ICheckoutAddress
  ) => Promise<IApolloClientManagerResponse<IPaymentModel>>;
  completeCheckout: (
    checkoutId: string
  ) => Promise<IApolloClientManagerResponse<IOrderModel>>;
}
