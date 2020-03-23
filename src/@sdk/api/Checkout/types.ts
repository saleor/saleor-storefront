import { ICheckoutModel } from "@sdk/repository";

import { PromiseResponse } from "../types";

export interface ISaleorCheckoutAPI {
  checkout: ICheckoutModel | null;
  promoCode: string | null;
  shippingAsBilling: boolean;
  addItemToCart: (variantId: string, quantity: number) => PromiseResponse;
  load: () => PromiseResponse;
  removeItemFromCart: (variantId: string) => PromiseResponse;
  subtractItemFromCart: (variantId: string) => PromiseResponse;
  setBillingAddress: () => PromiseResponse;
  setShippingAddress: () => PromiseResponse;
  setShippingAsBillingAddress: () => PromiseResponse;
  updateItemInCart: (variantId: string, quantity: number) => PromiseResponse;
  makeOrder: () => PromiseResponse;
}
