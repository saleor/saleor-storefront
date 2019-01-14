/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchResults
// ====================================================

export interface SearchResults_products_edges_node_thumbnail {
  url: string;
  alt: string | null;
}

export interface SearchResults_products_edges_node_thumbnail2x {
  url: string;
}

export interface SearchResults_products_edges_node_category {
  id: string;
  name: string;
}

export interface SearchResults_products_edges_node {
  id: string;
  name: string;
  thumbnail: SearchResults_products_edges_node_thumbnail | null;
  thumbnail2x: SearchResults_products_edges_node_thumbnail2x | null;
  url: string;
  category: SearchResults_products_edges_node_category;
}

export interface SearchResults_products_edges {
  node: SearchResults_products_edges_node;
}

export interface SearchResults_products_pageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface SearchResults_products {
  edges: SearchResults_products_edges[];
  pageInfo: SearchResults_products_pageInfo;
}

export interface SearchResults {
  products: SearchResults_products | null;
}

export interface SearchResultsVariables {
  query: string;
}
