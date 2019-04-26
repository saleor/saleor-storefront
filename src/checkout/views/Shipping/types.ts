import { History } from "history";

import { AddressInput } from "../../../../types/globalTypes";
import { CartLineInterface } from "../../../components/CartProvider/context";
import { CheckoutContextInterface } from "../../context";

export interface ICheckoutData {
  shippingAddress: AddressInput;
  email?: string;
  lines?: CartLineInterface[];
}
export interface IProceedToShippingArgs {
  update: (checkoutData: CheckoutContextInterface) => void;
  history: History;
  token?: string;
}
