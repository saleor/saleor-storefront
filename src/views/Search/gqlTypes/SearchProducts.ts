/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: SearchProducts
// ====================================================

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  net: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  net: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface SearchProducts_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  stop: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface SearchProducts_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface SearchProducts_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface SearchProducts_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: SearchProducts_products_edges_node_pricing_priceRange_start_gross;
  net: SearchProducts_products_edges_node_pricing_priceRange_start_net;
}

export interface SearchProducts_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface SearchProducts_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface SearchProducts_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: SearchProducts_products_edges_node_pricing_priceRange_stop_gross;
  net: SearchProducts_products_edges_node_pricing_priceRange_stop_net;
}

export interface SearchProducts_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: SearchProducts_products_edges_node_pricing_priceRange_start | null;
  stop: SearchProducts_products_edges_node_pricing_priceRange_stop | null;
}

export interface SearchProducts_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: SearchProducts_products_edges_node_pricing_priceRangeUndiscounted | null;
  priceRange: SearchProducts_products_edges_node_pricing_priceRange | null;
}

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

export interface SearchProducts_products_edges_node {
  __typename: "Product";
  pricing: SearchProducts_products_edges_node_pricing | null;
  id: string;
  name: string;
  thumbnail: SearchProducts_products_edges_node_thumbnail | null;
  thumbnail2x: SearchProducts_products_edges_node_thumbnail2x | null;
  category: SearchProducts_products_edges_node_category | null;
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
  channel: string;
  attributes?: (AttributeInput | null)[] | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  after?: string | null;
}
