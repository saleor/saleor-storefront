/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Price
// ====================================================

export interface Price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface Price_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface Price {
  __typename: "TaxedMoney";
  gross: Price_gross;
  net: Price_net;
}
