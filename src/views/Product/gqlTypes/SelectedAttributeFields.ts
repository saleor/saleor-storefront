/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SelectedAttributeFields
// ====================================================

export interface SelectedAttributeFields_attribute_translation {
  __typename: "AttributeTranslation";
  name: string;
}

export interface SelectedAttributeFields_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Returns translated attribute fields for the given language code.
   */
  translation: SelectedAttributeFields_attribute_translation | null;
}

export interface SelectedAttributeFields_values_translation {
  __typename: "AttributeValueTranslation";
  name: string;
}

export interface SelectedAttributeFields_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Returns translated attribute value fields for the given language code.
   */
  translation: SelectedAttributeFields_values_translation | null;
}

export interface SelectedAttributeFields {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SelectedAttributeFields_attribute;
  /**
   * Values of an attribute.
   */
  values: (SelectedAttributeFields_values | null)[];
}
