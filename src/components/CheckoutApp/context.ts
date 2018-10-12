import { createContext } from "react";

import { CheckoutInterface } from "../../core/types";

export interface CheckoutContextInterface {
  checkout: CheckoutInterface;
  loading: boolean;
  updateCheckout(chekcout: CheckoutInterface): void;
}

export const CheckoutContext = createContext<CheckoutContextInterface>({
  checkout: null,
  loading: false,
  updateCheckout: (checkout: {}) => null
});
