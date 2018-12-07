/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Collections
// ====================================================

export interface Collections_collections_edges_node {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface Collections_collections_edges {
  __typename: "CollectionCountableEdge";
  node: Collections_collections_edges_node;
}

export interface Collections_collections {
  __typename: "CollectionCountableConnection";
  edges: Collections_collections_edges[];
}

export interface Collections {
  collections: Collections_collections | null;
}

export interface CollectionsVariables {
  first?: number | null;
}
