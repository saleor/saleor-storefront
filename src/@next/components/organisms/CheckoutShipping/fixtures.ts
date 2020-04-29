import { IShippingMethod } from "./types";

const shippingMethods: IShippingMethod[] = [
  {
    id: "1",
    name: "Basic",
    price: {
      amount: 32,
      currency: "USD",
    },
  },
  {
    id: "2",
    name: "Extra",
    price: {
      amount: 64,
      currency: "USD",
    },
  },
];

export const DEFAULT_PROPS = {
  shippingMethods,
};
