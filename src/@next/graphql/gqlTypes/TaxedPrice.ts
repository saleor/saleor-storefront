/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TaxedPrice
// ====================================================

export interface TaxedPrice_gross {
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

export interface TaxedPrice_net {
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

export interface TaxedPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: TaxedPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: TaxedPrice_net;
}
