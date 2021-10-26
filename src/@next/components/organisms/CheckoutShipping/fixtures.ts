import { IShippingMethod } from "./types";

const shippingMethods: IShippingMethod[] = [
  {
    id: "1",
    name: "Basic",
    price: {
      amount: 32,
      currency: "USD",
    },
    active: true,
    message: "",
  },
  {
    id: "2",
    name: "Extra",
    price: {
      amount: 64,
      currency: "USD",
    },
    active: true,
    message: "",
  },
];

export const DEFAULT_PROPS = {
  shippingMethods,
};
