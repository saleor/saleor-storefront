import React from "react";

import { CartContext } from "./context";
import { IProps } from "./types";

export function CartProvider({ children }: IProps): React.ReactElement<IProps> {
  /**
   * TODO
   */

  const getContext = () => ({
    error: null,
    loading: false,
    update: () => null,
  });

  return (
    <CartContext.Provider value={getContext()}>{children}</CartContext.Provider>
  );
}
