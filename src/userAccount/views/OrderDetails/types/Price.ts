/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Price
// ====================================================

export interface Price_gross {
  __typename: "Money";
}

export interface Price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: Price_gross;
}
