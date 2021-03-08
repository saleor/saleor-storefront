/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Collection
// ====================================================

export interface Collection_collection_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface Collection_collection {
  __typename: "Collection";
  id: string;
  slug: string;
  name: string;
  seoDescription: string | null;
  seoTitle: string | null;
  backgroundImage: Collection_collection_backgroundImage | null;
}

export interface Collection_attributes_edges_node_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface Collection_attributes_edges_node {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
  values: (Collection_attributes_edges_node_values | null)[] | null;
}

export interface Collection_attributes_edges {
  __typename: "AttributeCountableEdge";
  node: Collection_attributes_edges_node;
}

export interface Collection_attributes {
  __typename: "AttributeCountableConnection";
  edges: Collection_attributes_edges[];
}

export interface Collection {
  collection: Collection_collection | null;
  attributes: Collection_attributes | null;
}

export interface CollectionVariables {
  id: string;
  channel: string;
}
