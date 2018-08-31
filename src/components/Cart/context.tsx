import * as React from "react";

export interface CartLineInterface {
  variantId: string;
  quantity: number;
}

export interface CartInterface {
  lines: CartLineInterface[];
  add(variantId: string, quantity?: number): void;
  remove(variantId: string): void;
  changeQuantity(variantId: string, quantity: number);
  clear(): void;
  getQuantity(): number;
}

/* tslint:disable:no-empty */
export const CartContext = React.createContext<CartInterface>({
  add: (variantId, quantity = 1) => {},
  changeQuantity: (variantId, quantity) => {},
  clear: () => {},
  getQuantity: () => 0,
  lines: [],
  remove: variantId => {}
});
/* tslint:enable:no-empty */
