/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductVariantFields
// ====================================================

export interface ProductVariantFields_price {
  __typename: "Money";
  currency: string;
  amount: number;
  localized: string;
}

export interface ProductVariantFields_attributes_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
}

export interface ProductVariantFields_attributes_value {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  value: string | null;
}

export interface ProductVariantFields_attributes {
  __typename: "SelectedAttribute";
  attribute: ProductVariantFields_attributes_attribute;
  value: ProductVariantFields_attributes_value;
}

export interface ProductVariantFields {
  __typename: "ProductVariant";
  id: string;
  name: string;
  stockQuantity: number;
  price: ProductVariantFields_price | null;
  attributes: ProductVariantFields_attributes[];
}
