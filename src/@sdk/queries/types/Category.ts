/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductOrder } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Category_products_edges_node_thumbnail {
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

export interface Category_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Category_products_edges_node_price {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface Category_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Category_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: Category_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: Category_products_edges_node_thumbnail2x | null;
  /**
   * The product's default base price.
   */
  price: Category_products_edges_node_price | null;
  category: Category_products_edges_node_category;
}

export interface Category_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge
   */
  node: Category_products_edges_node;
}

export interface Category_products_pageInfo {
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

export interface Category_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection
   */
  totalCount: number | null;
  edges: Category_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: Category_products_pageInfo;
}

export interface Category {
  /**
   * List of the shop's products.
   */
  products: Category_products | null;
}

export interface CategoryVariables {
  id: string;
  attributes?: (any | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
