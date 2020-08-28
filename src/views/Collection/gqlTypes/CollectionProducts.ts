/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AttributeInput, ProductOrder } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CollectionProducts
// ====================================================

export interface CollectionProducts_collection_products_edges_node_thumbnail {
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

export interface CollectionProducts_collection_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
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

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_net {
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

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
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

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
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

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_start_gross {
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

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_start_net {
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

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_pricing_priceRange_start_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_gross {
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

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_net {
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

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: CollectionProducts_collection_products_edges_node_pricing_priceRange_stop_net;
}

export interface CollectionProducts_collection_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: CollectionProducts_collection_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: CollectionProducts_collection_products_edges_node_pricing_priceRange_stop | null;
}

export interface CollectionProducts_collection_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: CollectionProducts_collection_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: CollectionProducts_collection_products_edges_node_pricing_priceRange | null;
}

export interface CollectionProducts_collection_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface CollectionProducts_collection_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CollectionProducts_collection_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: CollectionProducts_collection_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: CollectionProducts_collection_products_edges_node_pricing | null;
  category: CollectionProducts_collection_products_edges_node_category | null;
}

export interface CollectionProducts_collection_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CollectionProducts_collection_products_edges_node;
}

export interface CollectionProducts_collection_products_pageInfo {
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

export interface CollectionProducts_collection_products {
  __typename: "ProductCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: CollectionProducts_collection_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: CollectionProducts_collection_products_pageInfo;
}

export interface CollectionProducts_collection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of products in this collection.
   */
  products: CollectionProducts_collection_products | null;
}

export interface CollectionProducts {
  /**
   * Look up a collection by ID.
   */
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
}
