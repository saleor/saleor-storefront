/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_products_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface GetProducts_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
}

export interface GetProducts_products_edges {
  __typename: "ProductCountableEdge";
  node: GetProducts_products_edges_node;
}

export interface GetProducts_products {
  __typename: "ProductCountableConnection";
  pageInfo: GetProducts_products_pageInfo;
  edges: GetProducts_products_edges[];
}

export interface GetProducts {
  products: GetProducts_products | null;
}

export interface GetProductsVariables {
  cursor?: string | null;
  perPage?: number | null;
  channel?: string | null;
}
