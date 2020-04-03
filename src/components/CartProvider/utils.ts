import { Checkout_lines } from "../../checkout/types/Checkout";
import { LineI } from "../CartTable/ProductRow";

export const extractCheckoutLines = (lines: Checkout_lines[]): LineI[] => {
  return lines
    .map(line => ({
      quantity: line.quantity,
      totalPrice: {
        ...line.totalPrice,
        currency: line.totalPrice.gross.currency,
        gross: {
          amount: line.quantity * line.totalPrice.gross.amount,
          ...line.totalPrice.gross,
        },
        net: {
          amount: line.quantity * line.totalPrice.net.amount,
          ...line.totalPrice.net,
        },
      },
      ...line.variant,
    }))
    .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
};
