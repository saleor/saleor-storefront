/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ProductOrder } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Collection
// ====================================================

export interface Collection_collection_backgroundImage {
  __typename: "Image";
  url: string;
}

export interface Collection_collection {
  __typename: "Collection";
  id: string;
  slug: string;
  name: string;
  backgroundImage: Collection_collection_backgroundImage | null;
}

export interface Collection_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface Collection_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface Collection_products_edges_node_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface Collection_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface Collection_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: Collection_products_edges_node_thumbnail | null;
  thumbnail2x: Collection_products_edges_node_thumbnail2x | null;
  price: Collection_products_edges_node_price | null;
  category: Collection_products_edges_node_category;
}

export interface Collection_products_edges {
  __typename: "ProductCountableEdge";
  node: Collection_products_edges_node;
}

export interface Collection_products_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface Collection_products {
  __typename: "ProductCountableConnection";
  totalCount: number | null;
  edges: Collection_products_edges[];
  pageInfo: Collection_products_pageInfo;
}

export interface Collection_attributes_edges_node_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface Collection_attributes_edges_node {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
  values: (Collection_attributes_edges_node_values | null)[] | null;
}

export interface Collection_attributes_edges {
  __typename: "AttributeCountableEdge";
  node: Collection_attributes_edges_node;
}

export interface Collection_attributes {
  __typename: "AttributeCountableConnection";
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
