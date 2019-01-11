/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ProductOrder } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: SearchProducts
// ====================================================

export interface SearchProducts_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface SearchProducts_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface SearchProducts_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface SearchProducts_products_edges_node_price {
  __typename: "Money";
  amount: number;
  currency: string;
  localized: string;
}

export interface SearchProducts_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: SearchProducts_products_edges_node_thumbnail | null;
  thumbnail2x: SearchProducts_products_edges_node_thumbnail2x | null;
  category: SearchProducts_products_edges_node_category;
  price: SearchProducts_products_edges_node_price | null;
}

export interface SearchProducts_products_edges {
  __typename: "ProductCountableEdge";
  node: SearchProducts_products_edges_node;
}

export interface SearchProducts_products_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface SearchProducts_products {
  __typename: "ProductCountableConnection";
  totalCount: number | null;
  edges: SearchProducts_products_edges[];
  pageInfo: SearchProducts_products_pageInfo;
}

export interface SearchProducts_attributes_edges_node_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface SearchProducts_attributes_edges_node {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
  values: (SearchProducts_attributes_edges_node_values | null)[] | null;
}

export interface SearchProducts_attributes_edges {
  __typename: "AttributeCountableEdge";
  node: SearchProducts_attributes_edges_node;
}

export interface SearchProducts_attributes {
  __typename: "AttributeCountableConnection";
  edges: SearchProducts_attributes_edges[];
}

export interface SearchProducts {
  products: SearchProducts_products | null;
  attributes: SearchProducts_attributes | null;
}

export interface SearchProductsVariables {
  query: string;
  attributes?: (any | null)[] | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  after?: string | null;
}
