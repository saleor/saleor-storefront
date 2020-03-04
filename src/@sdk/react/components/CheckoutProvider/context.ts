import * as React from "react";

import { Checkout } from "@sdk/fragments/types/Checkout";
import { ApolloErrorWithUserInput } from "../../types";
import { ICartItem } from "./types";

export interface ICheckoutContextState {
  checkout: Checkout | null;
  shippingAsBilling?: boolean;
}
export interface ICheckoutContextStateHandlers {
  setCartItems: (cartItems: ICartItem[]) => void;
  setShippingAsBilling: (shippingAsBilling: boolean) => void;
}

export interface ICheckoutContext {
  error: ApolloErrorWithUserInput | null;
  loading: boolean;
  state: ICheckoutContextState;
  stateHandlers: ICheckoutContextStateHandlers;
}

const CheckoutContextState = {
  checkout: null,
  shippingAsBilling: false,
};
const CheckoutContextStateHandlers = {
  setCartItems: () => null,
  setShippingAsBilling: () => null,
};

export const CheckoutContext = React.createContext<ICheckoutContext>({
  error: null,
  loading: false,
  state: CheckoutContextState,
  stateHandlers: CheckoutContextStateHandlers,
});

CheckoutContext.displayName = "CheckoutContext";
