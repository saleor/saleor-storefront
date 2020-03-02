import * as React from "react";

import { Checkout } from "@sdk/fragments/types/Checkout";
import { ApolloErrorWithUserInput } from "../../types";

export interface ICheckoutContext {
  checkout: Checkout | null;
  error: ApolloErrorWithUserInput | null;
  loading: boolean;
  shippingAsBilling?: boolean;
  update: (checkoutData: Checkout) => void;
}

export const CheckoutContext = React.createContext<ICheckoutContext>({
  checkout: null,
  error: null,
  loading: false,
  shippingAsBilling: false,
  update: () => null,
});

CheckoutContext.displayName = "CheckoutContext";
