import {
  Checkout_shippingPrice,
  Checkout_subtotalPrice,
  Checkout_totalPrice,
} from "@sdk/fragments/types/Checkout";
import { ICheckoutModelLine } from "@sdk/repository";

import { PromiseResponse } from "../types";

export type IItems = ICheckoutModelLine[] | null | undefined;
export type ITotalPrice = Checkout_totalPrice | null | undefined;
export type ISubtotalPrice = Checkout_subtotalPrice | null | undefined;
export type IShippingPrice = Checkout_shippingPrice | null | undefined;

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
