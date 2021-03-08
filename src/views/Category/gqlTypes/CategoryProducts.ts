/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CategoryProducts
// ====================================================

export interface CategoryProducts_products_edges_node_thumbnail {
  __typename: "Image";
  url: string;
  alt: string | null;
}

export interface CategoryProducts_products_edges_node_thumbnail2x {
  __typename: "Image";
  url: string;
}

export interface CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  gross: CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  net: CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  gross: CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  net: CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  start: CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  stop: CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface CategoryProducts_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CategoryProducts_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CategoryProducts_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  gross: CategoryProducts_products_edges_node_pricing_priceRange_start_gross;
  net: CategoryProducts_products_edges_node_pricing_priceRange_start_net;
}

export interface CategoryProducts_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CategoryProducts_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface CategoryProducts_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  gross: CategoryProducts_products_edges_node_pricing_priceRange_stop_gross;
  net: CategoryProducts_products_edges_node_pricing_priceRange_stop_net;
}

export interface CategoryProducts_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  start: CategoryProducts_products_edges_node_pricing_priceRange_start | null;
  stop: CategoryProducts_products_edges_node_pricing_priceRange_stop | null;
}

export interface CategoryProducts_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  onSale: boolean | null;
  priceRangeUndiscounted: CategoryProducts_products_edges_node_pricing_priceRangeUndiscounted | null;
  priceRange: CategoryProducts_products_edges_node_pricing_priceRange | null;
}

export interface CategoryProducts_products_edges_node_category {
  __typename: "Category";
  id: string;
  name: string;
}

export interface CategoryProducts_products_edges_node {
  __typename: "Product";
  id: string;
  name: string;
  thumbnail: CategoryProducts_products_edges_node_thumbnail | null;
  thumbnail2x: CategoryProducts_products_edges_node_thumbnail2x | null;
  pricing: CategoryProducts_products_edges_node_pricing | null;
  category: CategoryProducts_products_edges_node_category | null;
}

export interface CategoryProducts_products_edges {
  __typename: "ProductCountableEdge";
  node: CategoryProducts_products_edges_node;
}

export interface CategoryProducts_products_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface CategoryProducts_products {
  __typename: "ProductCountableConnection";
  totalCount: number | null;
  edges: CategoryProducts_products_edges[];
  pageInfo: CategoryProducts_products_pageInfo;
}

export interface CategoryProducts {
  products: CategoryProducts_products | null;
}

export interface CategoryProductsVariables {
  id: string;
  channel?: string | null;
  attributes?: (AttributeInput | null)[] | null;
  after?: string | null;
  pageSize?: number | null;
  sortBy?: ProductOrder | null;
  priceLte?: number | null;
  priceGte?: number | null;
}
