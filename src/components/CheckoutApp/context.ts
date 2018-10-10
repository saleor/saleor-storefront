import { createContext } from "react";

import { CheckoutInterface } from "../../core/types";

export const CheckoutContext = createContext<{ checkout: CheckoutInterface }>({
  checkout: null
});
