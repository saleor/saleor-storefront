/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductPricingField
// ====================================================

export interface ProductPricingField_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductPricingField_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductPricingField_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: ProductPricingField_pricing_priceRangeUndiscounted_start_gross;
  net: ProductPricingField_pricing_priceRangeUndiscounted_start_net;
}

export interface ProductPricingField_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductPricingField_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductPricingField_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: ProductPricingField_pricing_priceRangeUndiscounted_stop_gross;
  net: ProductPricingField_pricing_priceRangeUndiscounted_stop_net;
}

export interface ProductPricingField_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: ProductPricingField_pricing_priceRangeUndiscounted_start | null;
  stop: ProductPricingField_pricing_priceRangeUndiscounted_stop | null;
}

export interface ProductPricingField_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductPricingField_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductPricingField_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: ProductPricingField_pricing_priceRange_start_gross;
  net: ProductPricingField_pricing_priceRange_start_net;
}

export interface ProductPricingField_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductPricingField_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductPricingField_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: ProductPricingField_pricing_priceRange_stop_gross;
  net: ProductPricingField_pricing_priceRange_stop_net;
}

export interface ProductPricingField_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: ProductPricingField_pricing_priceRange_start | null;
  stop: ProductPricingField_pricing_priceRange_stop | null;
}

export interface ProductPricingField_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: ProductPricingField_pricing_priceRangeUndiscounted | null;
  priceRange: ProductPricingField_pricing_priceRange | null;
}

export interface ProductPricingField {
  __typename: "Product";
  pricing: ProductPricingField_pricing | null;
}
