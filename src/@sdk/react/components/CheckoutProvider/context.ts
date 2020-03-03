import * as React from "react";

import { Checkout } from "@sdk/fragments/types/Checkout";
import { ApolloErrorWithUserInput } from "../../types";
import { ICartItem } from "./types";

export interface ICheckoutContextHandlers {
  setCartItems: (cartItems: ICartItem[]) => void;
}

export interface ICheckoutContext {
  checkout: Checkout | null;
  error: ApolloErrorWithUserInput | null;
  loading: boolean;
  shippingAsBilling?: boolean;
  contextHandlers: ICheckoutContextHandlers;
}

const CheckoutContextHandlers = {
  setCartItems: () => null,
};

export const CheckoutContext = React.createContext<ICheckoutContext>({
  checkout: null,
  contextHandlers: CheckoutContextHandlers,
  error: null,
  loading: false,
  shippingAsBilling: false,
});

CheckoutContext.displayName = "CheckoutContext";
