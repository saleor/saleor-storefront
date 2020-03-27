import { ICheckoutModel, ICheckoutModelLine } from "@sdk/repository";

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
    shippingAddress: object,
    billingAddress: object,
    lines: Array<{ variantId: string; quantity: number }>
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setCartItem: (
    checkout: ICheckoutModel
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setBillingAddress: () => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setShippingAddress: (
    checkout: ICheckoutModel
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setShippingAsBillingAddress: () => Promise<
    INetworkManagerResponse<ICheckoutModel>
  >;
}
