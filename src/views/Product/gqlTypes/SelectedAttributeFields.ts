/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SelectedAttributeFields
// ====================================================

export interface SelectedAttributeFields_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
}

export interface SelectedAttributeFields_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
}

export interface SelectedAttributeFields {
  __typename: "SelectedAttribute";
  attribute: SelectedAttributeFields_attribute;
  values: (SelectedAttributeFields_values | null)[];
}
