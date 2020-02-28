import * as React from "react";

import { ApolloErrorWithUserInput } from "../../types";

export interface CartLine {
  variantId: string;
  quantity: number;
}

export interface ICartContext {
  // lines: CartLine[];
  // loading: boolean;
  // error: ApolloErrorWithUserInput | null;
  // setLine(variantId: string, quantity?: number): void;
  // clear(): void;
  // clearErrors(): void;
}

export const CartContext = React.createContext<ICartContext>({
  // clear: () => null,
  // clearErrors: () => null,
  // error: null,
  // lines: [],
  // loading: false,
  // setLine: (variantId, quantity = 1) => null,
});

CartContext.displayName = "CartContext";
