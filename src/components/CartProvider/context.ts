import { createContext } from "react";

import { ApolloError } from "apollo-client";
import { PriceInterface } from "../../core/types";

export interface CartLineInterface {
  variantId: string;
  variant?: any;
  quantity: number;
}

export interface CartInterface {
  errors: ApolloError[] | null;
  loading: boolean;
  lines: CartLineInterface[];
  add(variantId: string, quantity?: number): void;
  remove(variantId: string): void;
  changeQuantity(variantId: string, quantity: number);
  fetch(): void;
  clear(): void;
  getQuantity(): number;
  getTotal(): { currency: string; amount: number };
}

/* tslint:disable:no-empty */
export const CartContext = createContext<CartInterface>({
  add: (variantId, quantity = 1) => {},
  changeQuantity: (variantId, quantity) => {},
  clear: () => {},
  errors: null,
  fetch: () => {},
  getQuantity: () => 0,
  getTotal: () => ({ currency: "USD", amount: 0 }),
  lines: [],
  loading: false,

  remove: variantId => {}
});
/* tslint:enable:no-empty */
