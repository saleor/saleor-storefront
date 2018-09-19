import * as React from "react";

import { PriceInterface, ProductVariantInterface } from "../../core/types";

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
  getVariantQuantity(variantId: string): number;
  getTotal(variants: ProductVariantInterface[]): PriceInterface;
}

/* tslint:disable:no-empty */
export const CartContext = React.createContext<CartInterface>({
  add: (variantId, quantity = 1) => {},
  changeQuantity: (variantId, quantity) => {},
  clear: () => {},
  getQuantity: () => 0,
  getTotal: variants => ({ currency: "USD", amount: 0 }),
  getVariantQuantity: variantId => 0,
  lines: [],
  remove: variantId => {}
});
/* tslint:enable:no-empty */
