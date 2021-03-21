/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Collection
// ====================================================

export interface Collection_collection_translation {
  __typename: "Translation";
  /**
   * The URL of the image.
   */
  name: string;
  descriptionJson: any;
}

export interface Collection_collection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CollectionDetails_collection_metadata {
  __typename: "Metadata";

  key: string;
  value: string;
}

export interface Collection_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  descriptionJson: any;
  seoDescription: string | null;
  seoTitle: string | null;
  translation: Collection_collection_translation | null;
  backgroundImage: Collection_collection_backgroundImage | null;
  metadata: (CollectionDetails_collection_metadata | null)[] | null;
}

export interface Collection_attributes_edges_node_values {
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

export interface Collection_attributes_edges_node {
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
  values: (Collection_attributes_edges_node_values | null)[] | null;
}

export interface Collection_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Collection_attributes_edges_node;
}

export interface Collection_attributes {
  __typename: "AttributeCountableConnection";
  edges: Collection_attributes_edges[];
}

export interface Collection {
  /**
   * Look up a collection by ID.
   */
  collection: Collection_collection | null;
  /**
   * List of the shop's attributes.
   */
  attributes: Collection_attributes | null;
}

export interface CollectionVariables {
  id: string;
}
