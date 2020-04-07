import {
  ICheckoutModelLine,
  ICheckoutModelPrice,
  ICheckoutModelPriceValue,
} from "@sdk/repository";

import { PromiseResponse } from "../types";

export type IItems = ICheckoutModelLine[] | null | undefined;
export type ITotalPrice = ICheckoutModelPrice | null | undefined;
export type ISubtotalPrice = ICheckoutModelPrice | null | undefined;
export type IShippingPrice = ICheckoutModelPriceValue | null | undefined;

export interface ISaleorCartAPI {
  loaded: boolean;
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
