/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCollections
// ====================================================

export interface GetCollections_collections_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface GetCollections_collections_edges_node {
  __typename: "Collection";
  id: string;
  name: string;
}

export interface GetCollections_collections_edges {
  __typename: "CollectionCountableEdge";
  node: GetCollections_collections_edges_node;
}

export interface GetCollections_collections {
  __typename: "CollectionCountableConnection";
  pageInfo: GetCollections_collections_pageInfo;
  edges: GetCollections_collections_edges[];
}

export interface GetCollections {
  collections: GetCollections_collections | null;
}

export interface GetCollectionsVariables {
  cursor?: string | null;
  perPage?: number | null;
  channel?: string | null;
}
