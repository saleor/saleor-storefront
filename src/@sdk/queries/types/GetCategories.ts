/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategories
// ====================================================

export interface GetCategories_categories_pageInfo {
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

export interface GetCategories_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface GetCategories_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCategories_categories_edges_node;
}

export interface GetCategories_categories {
  __typename: "CategoryCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetCategories_categories_pageInfo;
  edges: GetCategories_categories_edges[];
}

export interface GetCategories {
  /**
   * List of the shop's categories.
   */
  categories: GetCategories_categories | null;
}

export interface GetCategoriesVariables {
  cursor?: string | null;
  perPage?: number | null;
}
