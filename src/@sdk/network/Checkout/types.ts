import { ICheckoutModel } from "@sdk/repository";

import { INetworkManagerResponse } from "../types";

export interface ICheckoutNetworkManager {
  getCheckout: (
    checkoutToken: string | null
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  createCheckout: (
    email: string,
    shippingAddress: object,
    billingAddress: object,
    lines: Array<{
      variantId: string;
      quantity: number;
    }>
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setCartItem: (
    checkoutId: string,
    variantId: string,
    quantity: number
  ) => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setBillingAddress: () => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setShippingAddress: () => Promise<INetworkManagerResponse<ICheckoutModel>>;
  setShippingAsBillingAddress: () => Promise<
    INetworkManagerResponse<ICheckoutModel>
  >;
}
