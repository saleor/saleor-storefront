/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchResults
// ====================================================

export interface SearchResults_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface SearchResults_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SearchResults_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchResults_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchResults_collections_edges_node {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchResults_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SearchResults_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: SearchResults_products_edges_node_thumbnail2x | null;
  /**
   * The storefront URL for the product.
   */
  url: string;
  category: SearchResults_products_edges_node_category;
}

export interface SearchResults_categories_edges {
  __typename: "categoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchResults_categories_edges_node;
}

export interface SearchResults_collections_edges {
  __typename: "collectionCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchResults_collections_edges_node;
}

export interface SearchResults_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchResults_products_edges_node;
}

export interface SearchResults_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface SearchResults_categories {
  __typename: "CategoryCountableConnection";
  edges: SearchResults_categories_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchResults_products_pageInfo;
}

export interface SearchResults_collections {
  __typename: "CollectionCountableConnection";
  edges: SearchResults_collections_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchResults_products_pageInfo;
}

export interface SearchResults_products {
  __typename: "ProductCountableConnection";
  edges: SearchResults_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchResults_products_pageInfo;
}

export interface SearchResults {
  /**
   * List of the shop's products.
   */
  products: SearchResults_products | null;
  collections: SearchResults_collections | null;
  categories: SearchResults_categories | null;
}

export interface SearchResultsVariables {
  query: string;
}
