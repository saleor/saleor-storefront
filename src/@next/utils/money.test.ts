import { IMoney } from "@types";

import { isPriceEqual } from "./money";

const firstPrice: IMoney = {
  amount: 100,
  currency: "USD",
};

describe("Comparing two prices", () => {
  it("Returns true if amount and currency is same", () => {
    const secondPrice: IMoney = {
      amount: 100,
      currency: "USD",
    };

    expect(isPriceEqual(firstPrice, secondPrice)).toBeTruthy();
  });

  it("Returns false if amount is same and currency is not", () => {
    const secondPrice: IMoney = {
      amount: 100,
      currency: "PLN",
    };

    expect(isPriceEqual(firstPrice, secondPrice)).toBeFalsy();
  });

  it("Returns false if currency is same and amount is not", () => {
    const secondPrice: IMoney = {
      amount: 200,
      currency: "USD",
    };

    expect(isPriceEqual(firstPrice, secondPrice)).toBeFalsy();
  });

  it("Returns false if amount and currency is not same", () => {
    const secondPrice: IMoney = {
      amount: 200,
      currency: "PLN",
    };

    expect(isPriceEqual(firstPrice, secondPrice)).toBeFalsy();
  });
});
