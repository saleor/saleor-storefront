import { createContext } from "react";

import { ApolloError } from "apollo-client";

export interface CartLineInterface {
  variantId: string;
  variant?: any;
  quantity: number;
}

export interface CartInterface {
  errors: ApolloError[] | null;
  lines: CartLineInterface[];
  loading: boolean;
  add(variantId: string, quantity?: number): void;
  changeQuantity(variantId: string, quantity: number);
  clear(): void;
  clearErrors(): void;
  getQuantity(): number;
  getTotal(): { currency: string; amount: number };
  remove(variantId: string): void;
  subtract(variantId: string, quantity?: number): void;
}

/* tslint:disable:no-empty */
export const CartContext = createContext<CartInterface>({
  add: (variantId, quantity = 1) => {},
  changeQuantity: (variantId, quantity) => {},
  clear: () => {},
  clearErrors: () => {},
  errors: null,
  getQuantity: () => 0,
  getTotal: () => ({ currency: "USD", amount: 0 }),
  lines: [],
  loading: false,
  remove: variantId => {},
  subtract: (variantId, quantity = 1) => {}
});
/* tslint:enable:no-empty */
