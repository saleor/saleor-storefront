/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShopAttributesQuery
// ====================================================

export interface ShopAttributesQuery_attributes_edges_node_values {
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

export interface ShopAttributesQuery_attributes_edges_node {
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
  values: (ShopAttributesQuery_attributes_edges_node_values | null)[] | null;
}

export interface ShopAttributesQuery_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShopAttributesQuery_attributes_edges_node;
}

export interface ShopAttributesQuery_attributes {
  __typename: "AttributeCountableConnection";
  edges: ShopAttributesQuery_attributes_edges[];
}

export interface ShopAttributesQuery {
  /**
   * List of the shop's attributes.
   */
  attributes: ShopAttributesQuery_attributes | null;
}

export interface ShopAttributesQueryVariables {
  channel: string;
  collectionId?: string | null;
  categoryId?: string | null;
}
