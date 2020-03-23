import { ICheckoutModelLine } from "@sdk/repository";

import { PromiseResponse } from "../types";

export type IItems = ICheckoutModelLine[] | null | undefined;

export interface ISaleorCartAPI {
  items: IItems;
  addItem: (variantId: string, quantity: number) => PromiseResponse;
  load: () => PromiseResponse;
  removeItem: (variantId: string) => PromiseResponse;
  subtractItem: (variantId: string) => PromiseResponse;
  updateItem: (variantId: string, quantity: number) => PromiseResponse;
}
