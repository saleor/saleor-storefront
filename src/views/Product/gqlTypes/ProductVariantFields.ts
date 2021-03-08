/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductVariantFields
// ====================================================

export interface ProductVariantFields_images {
  __typename: "ProductImage";
  id: string;
  url: string;
  alt: string;
}

export interface ProductVariantFields_pricing_priceUndiscounted_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductVariantFields_pricing_priceUndiscounted_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductVariantFields_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  gross: ProductVariantFields_pricing_priceUndiscounted_gross;
  net: ProductVariantFields_pricing_priceUndiscounted_net;
}

export interface ProductVariantFields_pricing_price_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductVariantFields_pricing_price_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductVariantFields_pricing_price {
  __typename: "TaxedMoney";
  gross: ProductVariantFields_pricing_price_gross;
  net: ProductVariantFields_pricing_price_net;
}

export interface ProductVariantFields_pricing {
  __typename: "VariantPricingInfo";
  onSale: boolean | null;
  priceUndiscounted: ProductVariantFields_pricing_priceUndiscounted | null;
  price: ProductVariantFields_pricing_price | null;
}

export interface ProductVariantFields_attributes_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface ProductVariantFields_attributes_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  value: string | null;
}

export interface ProductVariantFields_attributes {
  __typename: "SelectedAttribute";
  attribute: ProductVariantFields_attributes_attribute;
  values: (ProductVariantFields_attributes_values | null)[];
}

export interface ProductVariantFields {
  __typename: "ProductVariant";
  id: string;
  sku: string;
  name: string;
  quantityAvailable: number;
  images: (ProductVariantFields_images | null)[] | null;
  pricing: ProductVariantFields_pricing | null;
  attributes: ProductVariantFields_attributes[];
}
