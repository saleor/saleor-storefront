/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Attribute
// ====================================================

export interface Attribute_choices_edges_node {
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
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface Attribute_choices_edges {
  __typename: "AttributeValueCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Attribute_choices_edges_node;
}

export interface Attribute_choices {
  __typename: "AttributeValueCountableConnection";
  edges: Attribute_choices_edges[];
}

export interface Attribute {
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
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of attribute's values.
   */
  choices: Attribute_choices | null;
}
