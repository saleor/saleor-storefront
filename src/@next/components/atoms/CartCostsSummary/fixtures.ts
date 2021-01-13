import { ITaxedMoney } from "@types";

import { CartCostsSummaryProps } from "./CartCostsSummary";

const getPrice = (amount: number): ITaxedMoney => ({
  gross: {
    amount,
    currency: "USD",
  },
  net: {
    amount,
    currency: "USD",
  },
});

export const BASIC_COSTS: CartCostsSummaryProps = {
  subtotalPrice: getPrice(150),
  totalPrice: getPrice(180),
};

export const ALL_POSSIBLE_COSTS: CartCostsSummaryProps = {
  ...BASIC_COSTS,
  shippingPrice: getPrice(40),
  discountPrice: getPrice(10),
};
