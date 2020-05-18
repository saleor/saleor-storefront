/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCollections
// ====================================================

export interface GetCollections_collections_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface GetCollections_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface GetCollections_collections_edges {
  __typename: "CollectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCollections_collections_edges_node;
}

export interface GetCollections_collections {
  __typename: "CollectionCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetCollections_collections_pageInfo;
  edges: GetCollections_collections_edges[];
}

export interface GetCollections {
  /**
   * List of the shop's collections.
   */
  collections: GetCollections_collections | null;
}

export interface GetCollectionsVariables {
  cursor?: string | null;
  perPage?: number | null;
}
