import { History } from "history";
import { CheckoutContextInterface } from "../../context";
import { updateCheckoutBillingAddress } from "./types/updateCheckoutBillingAddress";

export interface IProceedToPaymentArgs {
  data: updateCheckoutBillingAddress;
  update: (checkoutData: CheckoutContextInterface) => void;
  history: History;
  token?: string;
}
