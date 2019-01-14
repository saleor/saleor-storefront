/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ProductOrder } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Collection
// ====================================================

export interface Collection_collection_backgroundImage {
  url: string;
}

export interface Collection_collection {
  id: string;
  slug: string;
  name: string;
  seoDescription: string | null;
  seoTitle: string | null;
  backgroundImage: Collection_collection_backgroundImage | null;
}

export interface Collection_products_edges_node_thumbnail {
  url: string;
  alt: string | null;
}

export interface Collection_products_edges_node_thumbnail2x {
  url: string;
}

export interface Collection_products_edges_node_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_category {
  id: string;
  name: string;
}

export interface Collection_products_edges_node {
  id: string;
  name: string;
  thumbnail: Collection_products_edges_node_thumbnail | null;
  thumbnail2x: Collection_products_edges_node_thumbnail2x | null;
  price: Collection_products_edges_node_price | null;
  category: Collection_products_edges_node_category;
}

export interface Collection_products_edges {
  node: Collection_products_edges_node;
}

export interface Collection_products_pageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface Collection_products {
  totalCount: number | null;
  edges: Collection_products_edges[];
  pageInfo: Collection_products_pageInfo;
}

export interface Collection_attributes_edges_node_values {
  id: string;
  name: string | null;
  slug: string | null;
}

export interface Collection_attributes_edges_node {
  id: string;
  name: string | null;
  slug: string | null;
  values: (Collection_attributes_edges_node_values | null)[] | null;
}

export interface Collection_attributes_edges {
  node: Collection_attributes_edges_node;
}

export interface Collection_attributes {
  edges: Collection_attributes_edges[];
}

export interface Collection {
  collection: Collection_collection | null;
  products: Collection_products | null;
  attributes: Collection_attributes | null;
}

export interface CollectionVariables {
  id: string;
  attributes?: (any | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
