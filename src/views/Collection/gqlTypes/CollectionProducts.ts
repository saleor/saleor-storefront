/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CollectionProducts
// ====================================================

export interface CollectionProducts_collection_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface CollectionProducts_collection_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  net: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  net: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  stop: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRange_start_gross;
  net: CollectionProducts_collection_products_edges_node_pricing_priceRange_start_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_gross;
  net: CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: CollectionProducts_collection_products_edges_node_pricing_priceRange_start | null;
  stop: CollectionProducts_collection_products_edges_node_pricing_priceRange_stop | null;
}

export interface CollectionProducts_collection_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted | null;
  priceRange: CollectionProducts_collection_products_edges_node_pricing_priceRange | null;
}

export interface CollectionProducts_collection_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface CollectionProducts_collection_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: CollectionProducts_collection_products_edges_node_thumbnail | null;
  thumbnail2x: CollectionProducts_collection_products_edges_node_thumbnail2x | null;
  pricing: CollectionProducts_collection_products_edges_node_pricing | null;
  category: CollectionProducts_collection_products_edges_node_category | null;
}

export interface CollectionProducts_collection_products_edges {
  __typename: "ProductCountableEdge";
  node: CollectionProducts_collection_products_edges_node;
}

export interface CollectionProducts_collection_products_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface CollectionProducts_collection_products {
  __typename: "ProductCountableConnection";
  totalCount: number | null;
  edges: CollectionProducts_collection_products_edges[];
  pageInfo: CollectionProducts_collection_products_pageInfo;
}

export interface CollectionProducts_collection {
  __typename: "Collection";
  id: string;
  products: CollectionProducts_collection_products | null;
}

export interface CollectionProducts {
  collection: CollectionProducts_collection | null;
}

export interface CollectionProductsVariables {
  id: string;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
  channel: string;
}
