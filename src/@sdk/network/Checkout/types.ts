import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IPaymentModel,
} from "@sdk/repository";

import { INetworkManagerResponse } from "../types";

export interface ICheckoutNetworkManager {
  getCheckout: (
    checkoutToken: string | null
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  getRefreshedCheckoutLines: (
    checkoutlines: ICheckoutModelLine[] | null
  ) => Promise<INetworkManagerResponse<ICheckoutModelLine[]>>;
  createCheckout: (
    email: string,
    lines: Array<{ variantId: string; quantity: number }>,
    shippingAddress: ICheckoutAddress,
    billingAddress?: ICheckoutAddress
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setCartItem: (
    checkout: ICheckoutModel
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setBillingAddress: (
    checkout: ICheckoutModel
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setShippingAddress: (
    checkout: ICheckoutModel
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  createPayment: (
    checkout: ICheckoutModel,
    payment: IPaymentModel
  ) => Promise<INetworkManagerResponse<IPaymentModel>>;
}
