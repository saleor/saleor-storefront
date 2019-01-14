/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ProductOrder } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Category_products_edges_node_thumbnail {
  url: string;
  alt: string | null;
}

export interface Category_products_edges_node_thumbnail2x {
  url: string;
}

export interface Category_products_edges_node_price {
  amount: number;
  currency: string;
  localized: string;
}

export interface Category_products_edges_node_category {
  id: string;
  name: string;
}

export interface Category_products_edges_node {
  id: string;
  name: string;
  thumbnail: Category_products_edges_node_thumbnail | null;
  thumbnail2x: Category_products_edges_node_thumbnail2x | null;
  price: Category_products_edges_node_price | null;
  category: Category_products_edges_node_category;
}

export interface Category_products_edges {
  node: Category_products_edges_node;
}

export interface Category_products_pageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface Category_products {
  totalCount: number | null;
  edges: Category_products_edges[];
  pageInfo: Category_products_pageInfo;
}

export interface Category_category_backgroundImage {
  url: string;
}

export interface Category_category_ancestors_edges_node {
  id: string;
  name: string;
}

export interface Category_category_ancestors_edges {
  node: Category_category_ancestors_edges_node;
}

export interface Category_category_ancestors {
  edges: Category_category_ancestors_edges[];
}

export interface Category_category {
  seoDescription: string | null;
  seoTitle: string | null;
  id: string;
  name: string;
  backgroundImage: Category_category_backgroundImage | null;
  ancestors: Category_category_ancestors | null;
}

export interface Category_attributes_edges_node_values {
  id: string;
  name: string | null;
  slug: string | null;
}

export interface Category_attributes_edges_node {
  id: string;
  name: string | null;
  slug: string | null;
  values: (Category_attributes_edges_node_values | null)[] | null;
}

export interface Category_attributes_edges {
  node: Category_attributes_edges_node;
}

export interface Category_attributes {
  edges: Category_attributes_edges[];
}

export interface Category {
  products: Category_products | null;
  category: Category_category | null;
  attributes: Category_attributes | null;
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
