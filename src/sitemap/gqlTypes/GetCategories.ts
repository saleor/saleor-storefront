/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategories
// ====================================================

export interface GetCategories_categories_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface GetCategories_categories_edges_node {
  __typename: "Category";
  id: string;
  name: string;
}

export interface GetCategories_categories_edges {
  __typename: "CategoryCountableEdge";
  node: GetCategories_categories_edges_node;
}

export interface GetCategories_categories {
  __typename: "CategoryCountableConnection";
  pageInfo: GetCategories_categories_pageInfo;
  edges: GetCategories_categories_edges[];
}

export interface GetCategories {
  categories: GetCategories_categories | null;
}

export interface GetCategoriesVariables {
  cursor?: string | null;
  perPage?: number | null;
}
