import * as React from "react";

import { ApolloErrorWithUserInput } from "../../types";

export interface CartItem {
  variantId: string;
  quantity: number;
}

export interface ICartContext {
  items: CartItem[];
  error: ApolloErrorWithUserInput | null;
  loading: boolean;
  setItem(item: CartItem): void;
}

export const CartContext = React.createContext<ICartContext>({
  error: null,
  items: [],
  loading: false,
  setItem: () => null,
});

CartContext.displayName = "CartContext";
