/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_products_pageInfo {
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

export interface GetProducts_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface GetProducts_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetProducts_products_edges_node;
}

export interface GetProducts_products {
  __typename: "ProductCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetProducts_products_pageInfo;
  edges: GetProducts_products_edges[];
}

export interface GetProducts {
  /**
   * List of the shop's products.
   */
  products: GetProducts_products | null;
}

export interface GetProductsVariables {
  cursor?: string | null;
  perPage?: number | null;
}
