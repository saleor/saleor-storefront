import * as React from "react";

import { Checkout } from "@sdk/fragments/types/Checkout";
import { ApolloErrorWithUserInput } from "../../types";

export interface ICheckoutContext {
  checkout: Checkout | null;
  error: ApolloErrorWithUserInput | null;
  loading: boolean;
  shippingAsBilling?: boolean;
}

export const CheckoutContext = React.createContext<ICheckoutContext>({
  checkout: null,
  error: null,
  loading: false,
  shippingAsBilling: false,
});

CheckoutContext.displayName = "CheckoutContext";
