import { ICheckoutModelLine, ICheckoutModelPrice } from "@sdk/repository";

import { PromiseResponse } from "../types";

export type IItems = ICheckoutModelLine[] | null | undefined;
export type ITotalPrice = ICheckoutModelPrice | null | undefined;
export type ISubtotalPrice = ICheckoutModelPrice | null | undefined;
export type IShippingPrice = ICheckoutModelPrice | null | undefined;

export interface ISaleorCartAPI {
  items?: IItems;
  totalPrice?: ITotalPrice;
  subtotalPrice?: ISubtotalPrice;
  shippingPrice?: IShippingPrice;
  addItem: (variantId: string, quantity: number) => PromiseResponse;
  load: () => PromiseResponse;
  removeItem: (variantId: string) => PromiseResponse;
  subtractItem: (variantId: string) => PromiseResponse;
  updateItem: (variantId: string, quantity: number) => PromiseResponse;
}
