import * as React from "react";

import { ApolloErrorWithUserInput } from "../../types";

export interface ICartContext {
  loading: boolean;
  error: ApolloErrorWithUserInput | null;
  update(): void;
}

export const CartContext = React.createContext<ICartContext>({
  error: null,
  loading: false,
  update: () => null,
});

CartContext.displayName = "CartContext";
