import { Checkout_shippingAddress } from "@sdk/fragments/types/Checkout";

import { PromiseResponse } from "../types";

export interface ICheckout {
  id: string | undefined;
  email: string | undefined;
  shippingAddress: object | null | undefined;
  billingAddress: object | null | undefined;
}

export interface ISaleorCheckoutAPI {
  checkout: ICheckout | null;
  promoCode: string | null;
  shippingAsBilling: boolean;
  load: () => PromiseResponse;
  setBillingAddress: () => PromiseResponse;
  setShippingAddress: (
    shippingAddress: Checkout_shippingAddress
  ) => PromiseResponse;
  setShippingAsBillingAddress: () => PromiseResponse;
  makeOrder: () => PromiseResponse;
}
