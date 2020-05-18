/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Price
// ====================================================

export interface Price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Price_gross;
  /**
   * Amount of money without taxes.
   */
  net: Price_net;
}
