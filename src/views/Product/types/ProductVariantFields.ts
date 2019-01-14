/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductVariantFields
// ====================================================

export interface ProductVariantFields_price {
  currency: string;
  amount: number;
  localized: string;
}

export interface ProductVariantFields_attributes_attribute {
  id: string;
  name: string | null;
}

export interface ProductVariantFields_attributes_value {
  id: string;
  name: string | null;
  value: string | null;
}

export interface ProductVariantFields_attributes {
  attribute: ProductVariantFields_attributes_attribute;
  value: ProductVariantFields_attributes_value;
}

export interface ProductVariantFields {
  id: string;
  name: string;
  stockQuantity: number;
  price: ProductVariantFields_price | null;
  attributes: ProductVariantFields_attributes[];
}
