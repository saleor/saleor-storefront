import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  IOrderModel,
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
  setShippingMethod: (
    checkout: ICheckoutModel
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  addPromoCode: (
    promoCode: string,
    checkout: ICheckoutModel
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  removePromoCode: (
    promoCode: string,
    checkout: ICheckoutModel
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  createPayment: (
    amount: number,
    checkout: ICheckoutModel,
    payment: IPaymentModel
  ) => Promise<INetworkManagerResponse<IPaymentModel>>;
  completeCheckout: (
    checkout: ICheckoutModel
  ) => Promise<INetworkManagerResponse<IOrderModel>>;
}
